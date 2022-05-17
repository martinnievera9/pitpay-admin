import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { DrawerForm } from 'components/Drawer';
import { FeeMatrixForm } from 'components/FeeMatrices';
import {
  useCreateMatrix,
  useDeleteMatrix,
  useDuplicateMatrix,
  useGetMatrices,
  useUpdateMatrix,
} from 'components/FeeMatrices/gql';
import Icon from 'components/Icon';
import LineHeightText from 'components/LineHeightText';
import { ConfirmModal } from 'components/Modal';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { Table } from 'components/Table';
import useTheme from 'hooks/useTheme';
import {
  logDevError,
  createSuccessMessage,
  createErrorMessage,
  deleteSuccessMessage,
  deleteErrorMessage,
  updateErrorMessage,
  updateSuccessMessage,
  formErrorMessage,
} from 'shared/alerts';

const validators = {
  name: (name) => {
    return !name || typeof name !== 'string' || name.length < 2
      ? 'A name of 2 characters or longer is required'
      : undefined;
  },
  items: (items) => {
    return items.reduce((itemsErrors, item) => {
      if (itemsErrors) return itemsErrors;
      const feeError = !item.fee || Number(item.fee) < 0 ? true : false;
      const ticketPriceError =
        !item.ticket_price || Number(item.ticket_price) < 0 ? true : false;
      return feeError || ticketPriceError
        ? 'Each Fee Matrix item must have a Ticke Price and a Fee'
        : itemsErrors;
    }, undefined);
  },
};

export const FeeMatrices = () => {
  const [matrixToEdit, setMatrixToEdit] = useState(null);
  const [matrixIdToDelete, setMatrixIdToDelete] = useState(null);
  const [shouldDisplayDrawer, setShouldDisplayDrawer] = useState(false);
  const [
    shouldDisplayDeleteConfirmation,
    setShouldDisplayDeleteConfirmation,
  ] = useState(false);
  const theme = useTheme();
  const createMatrix = useCreateMatrix();
  const updateMatrix = useUpdateMatrix();
  const deleteMatrix = useDeleteMatrix();
  const duplicateMatrix = useDuplicateMatrix();
  const { data } = useGetMatrices();

  if (!data || !data.getMatrices) return false;

  const { count, results } = data.getMatrices;

  function validate(values) {
    const errors = Object.entries(values).reduce((allErrors, [key, value]) => {
      const error = validators[key](value);
      return {
        ...allErrors,
        ...(error ? { [key]: error } : undefined),
      };
    }, {});
    if (Object.keys(errors).length > 0) {
      formErrorMessage();
    }
    return errors;
  }

  async function submit(values, { setSubmitting, setErrors }) {
    setSubmitting(true);
    const input = {
      ...values,
      items: values.items.map((item) => {
        // eslint-disable-next-line no-unused-vars
        const { matrix_id, __typename, ...rest } = item;
        return Object.entries(rest).reduce(
          (numberized, [key, value]) => ({
            ...numberized,
            [key]: Number(value),
          }),
          {}
        );
      }),
      ...(matrixToEdit ? { id: matrixToEdit.id } : null),
    };

    const mutation = matrixToEdit ? updateMatrix : createMatrix;
    const successMessage = matrixToEdit
      ? updateSuccessMessage
      : createSuccessMessage;
    const errorMessage = matrixToEdit ? updateErrorMessage : createErrorMessage;

    try {
      const response = await mutation(input);

      if (!response || response.errors) {
        errorMessage('Fee Matrix', response);
        if (response && response.errors) setErrors(response.errors);
      } else {
        successMessage('Fee Matrix');
        setShouldDisplayDrawer(false);
        setMatrixToEdit(null);
      }
    } catch (error) {
      logDevError(error);
      errorMessage('Fee Matrix');
    }
    setSubmitting(false);
  }

  async function handleDeleteConfirm(id) {
    try {
      const success = await deleteMatrix(id);
      if (success) {
        deleteSuccessMessage('Fee Matrix');
        setMatrixIdToDelete(null);
        setShouldDisplayDeleteConfirmation(false);
      } else {
        deleteErrorMessage('Fee Matrix');
      }
    } catch (error) {
      logDevError(error);
      deleteErrorMessage('Fee Matrix');
    }
  }

  const columns = [
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: '',
      key: 'actions',
      textAlign: 'right',
    },
  ];

  function renderRows(rowData) {
    const { name, id } = rowData;
    return {
      name: <LineHeightText>{name}</LineHeightText>,
      actions: (
        <>
          <Icon
            icon="edit"
            size={18}
            color={theme.colors.primary}
            onClick={() => {
              setMatrixToEdit(rowData);
              setShouldDisplayDrawer(true);
            }}
            padding="0 15px 0 0"
          />
          <Icon
            onClick={() => {
              setMatrixIdToDelete(id);
              setShouldDisplayDeleteConfirmation(true);
            }}
            size={18}
            color={theme.colors.primary}
            icon="trash"
          />
          <Icon
            icon="duplicate"
            size={22}
            color={theme.colors.primary}
            onClick={async () => {
              if (
                window.confirm('Are you sure you want to duplicate this event?')
              ) {
                const response = await duplicateMatrix(id);
                if (!response || response.errors) {
                  toast.error('Could not duplicate this event');
                } else {
                  setMatrixToEdit(response?.data?.duplicateMatrix);
                  setShouldDisplayDrawer(true);
                  toast.success('Event successfully duplicated');
                }
              }
            }}
            padding="0 0 0 15px"
          />
        </>
      ),
    };
  }

  return (
    <>
      <SearchableListContainer
        pageCount={count}
        paginated
        onAddClick={() => setShouldDisplayDrawer(true)}
        searchInputPlaceholder="Search Fee Matrices"
        title="Fee Matrices"
      >
        <Table items={results} columns={columns} renderRows={renderRows} />
      </SearchableListContainer>
      <DrawerForm
        title={matrixToEdit ? 'Edit Fee Matrix' : 'New Fee Matrix'}
        shouldDisplay={shouldDisplayDrawer}
        onCloseClick={() => {
          setShouldDisplayDrawer(false);
          setMatrixToEdit(null);
        }}
        initialValues={
          matrixToEdit
            ? { name: matrixToEdit.name, items: matrixToEdit.items }
            : { name: '', items: [] }
        }
        validate={validate}
        onSubmit={submit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <FeeMatrixForm matrix={matrixToEdit} />
      </DrawerForm>
      <ConfirmModal
        confirmText="Delete Fee Matrix"
        cancelText="Don't Delete"
        hideModal={() => setShouldDisplayDeleteConfirmation(false)}
        isVisible={shouldDisplayDeleteConfirmation}
        onConfirm={() => handleDeleteConfirm(matrixIdToDelete)}
        title="Do you want to delete this Fee Matrix?"
      />
    </>
  );
};

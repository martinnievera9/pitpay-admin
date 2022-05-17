import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import Icon from 'components/Icon';
import LineHeightText from 'components/LineHeightText';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { compose } from 'recompose';
import { toast } from 'react-toastify';
import WaiverEdit from './WaiverEdit';
import Spacer from 'components/Spacer';
import GetWaivers from './gql/getWaivers';
import DeleteWaiver from './gql/deleteWaiver';

import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader
} from 'components/Table';

const Waiver = props => {
  const [isVisible, setIsVisible] = useState(false);
  const [editWaiver, setEditWaiver] = useState(null);
  const { data, deleteWaiver } = props;
  const [showModal, setShowModal] = useState(false);

  const handleOutClick = () => {
    setEditWaiver(null);
    setShowModal(false);
    setIsVisible(!isVisible);
  };

  return data.loading ? (
    <div />
  ) : (
    <>
      <SearchableListContainer
        onAddClick={() => {
          setIsVisible(true);
          setShowModal(true);
        }}
        pageCount={data.getAdminWaivers.count}
        paginated
        title="Waivers"
        searchInputPlaceholder="Search Waivers"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col">
                <LineHeightText>Waiver Name</LineHeightText>
              </TableCell>
              <TableCell scope="col">
                <LineHeightText>Waiver Id</LineHeightText>
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.getAdminWaivers.results.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <LineHeightText>{item.name}</LineHeightText>
                </TableCell>
                <TableCell>
                  <LineHeightText>{item.waiver_id}</LineHeightText>
                </TableCell>
                <TableCell>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%'
                    }}
                  >
                    <Icon
                      icon="edit"
                      size={18}
                      color={props.theme.colors.primary}
                      onClick={async () => {
                        setEditWaiver(item.id);
                        setIsVisible(true);
                        setTimeout(() => {
                          setShowModal(true);
                        }, 300);
                      }}
                      padding="0 15px 0 0"
                    />
                    <Spacer size={15} />
                    <Icon
                      icon="trash"
                      size={18}
                      color={props.theme.colors.primary}
                      onClick={async () => {
                        const successMessage = () =>
                          toast.success('Waiver Successfully Deleted');
                        const errorMessage = () =>
                          toast.error('Error Deleting Waiver');

                        if (
                          window.confirm(
                            'Are you sure you want to delete this waiver?'
                          )
                        ) {
                          const response = await deleteWaiver(item.id);
                          if (!response || response.errors) {
                            errorMessage();
                          }
                          successMessage();
                        }
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SearchableListContainer>
      {isVisible && (
        <WaiverEdit
          isVisible={showModal}
          handleOutClick={handleOutClick}
          currentWaiver={editWaiver}
        />
      )}
    </>
  );
};

export default withTheme(compose(GetWaivers, DeleteWaiver)(Waiver));

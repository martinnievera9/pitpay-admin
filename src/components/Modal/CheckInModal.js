import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { useOfflineCheck } from 'hooks/useOfflineCheck';
import { logDevError } from 'shared/alerts';

const Container = styled.div`
  padding: 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  width: 80%;
`;

export const CheckInModal = (props) => {
  const {
    errorMessage,
    isVisible,
    itemType,
    onConfirm,
    setIsVisible,
    successMessage,
    unCheck,
  } = props;

  const isOffline = useOfflineCheck();

  async function handleClick() {
    try {
      const response = await onConfirm();
      // Prevent success/error message when offline
      if (!isOffline) {
        if (response && !response.errors) {
          toast.success(
            successMessage ??
              `Successfully ${unCheck ? 'Unchecked' : 'Checked In'}`
          );
        } else {
          toast.error(
            errorMessage ??
              `Error ${unCheck ? 'Unchecking' : 'Checking In'} ${itemType}`
          );
        }
      }
    } catch (error) {
      logDevError(error);
    } finally {
      setIsVisible(false);
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      hideModal={() => setIsVisible(false)}
      title={`${unCheck ? 'Uncheck' : 'Check in'} ${
        itemType.charAt(0).toUpperCase() + itemType.slice(1)
      }`}
      maxWidth={600}
    >
      <Container>
        <p style={{ textAlign: 'left' }}>
          Are you sure you want to {unCheck ? 'uncheck' : 'check in'} this{' '}
          {itemType}?
        </p>
        <ButtonRow>
          <Button type="button" onClick={() => setIsVisible(false)}>
            No
          </Button>
          <Button type="button" onClick={handleClick}>
            Yes, {unCheck ? 'uncheck' : 'check in'}
          </Button>
        </ButtonRow>
      </Container>
    </Modal>
  );
};
CheckInModal.propTypes = {
  errorMessage: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  itemType: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  setIsVisible: PropTypes.func.isRequired,
  successMessage: PropTypes.string,
  unCheck: PropTypes.bool,
};

import PropTypes from 'prop-types';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import { Button } from 'components/Button';
import { Modal, modalPropTypes } from '.';

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  & > :not(:last-of-type) {
    margin-right: 20px;
  }

  @media (max-width: 860px) {
    flex-direction: column;
    padding: 40px 20px;
    & > button {
      width: 100%;
      &:not(:last-of-type) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }
`;

export const ConfirmModal = (props) => {
  const {
    confirmText,
    cancelText,
    hideModal,
    noCancel,
    onConfirm,
    onCancel,
    ...modalProps
  } = props;
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Modal
      hideModal={hideModal}
      maxWidth={isMobile ? undefined : 600}
      modalStyle={{ height: 'auto' }}
      {...modalProps}
    >
      <Content>
        {confirmText && (
          <Button onClick={onConfirm}>{confirmText ?? 'Confirm'}</Button>
        )}
        {!noCancel && (
          <Button onClick={onCancel ?? hideModal} outlined>
            {cancelText ?? 'Cancel'}
          </Button>
        )}
      </Content>
    </Modal>
  );
};
ConfirmModal.propTypes = {
  ...modalPropTypes,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  noCancel: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

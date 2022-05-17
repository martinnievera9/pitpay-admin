import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Modal, modalPropTypes } from '.';

export const TransactionModal = ({ children, modalStyle, ...modalProps }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <Modal
      modalStyle={{
        ...modalStyle,
        ...(isMobile ? { top: '80px' } : null)
      }}
      {...modalProps}
    >
      {children}
    </Modal>
  );
};
TransactionModal.propTypes = modalPropTypes;

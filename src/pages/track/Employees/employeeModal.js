import React from 'react';
import styled from 'styled-components';
import { Modal } from 'components/Modal';
import Text from 'components/Text';

const ModalContainer = styled.div`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const EmployeeModal = ({ closeModal }) => {
  return (
    <Modal
      isVisible={true}
      maxWidth={600}
      hideModal={closeModal}
      title="Staff Member"
    >
      <ModalContainer>
        <Text
          //   type="bold"
          //   fontWeight="600"
          inlineStyle={{ fontSize: 20, lineHeight: 1.4, whiteSpace: 'normal' }}
        >
          Your staff member will receive a text message and an email to assist
          them with getting logged into the Pit Pay Dashboard as a staff member.
        </Text>
      </ModalContainer>
    </Modal>
  );
};

export default EmployeeModal;

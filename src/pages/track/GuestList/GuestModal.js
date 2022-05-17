import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Checkbox } from 'components/Form/Checkbox';
import { CheckInModal, Modal } from 'components/Modal';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { useCheckinGuest, useUnCheckGuest } from 'pages/track/Guests/gql';
import { formatPhoneNumber } from 'shared/formatters';

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RowLabel = styled(Text)`
  color: ${(props) => props.theme.colors.text.gray};
  width: 23%;
`;

const ModalContainer = styled.div`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;

export const GuestModal = (props) => {
  const { isVisible, currentGuest, hideModal } = props;
  const {
    additional_guests,
    first_name,
    id,
    is_checked,
    last_name,
    notes,
    phone_number,
  } = currentGuest ?? {};

  const [shouldDisplayCheckInModal, setShouldDisplayCheckInModal] = useState(
    false
  );
  const [unCheck, setUncheck] = useState(false);

  const checkinGuest = useCheckinGuest();
  const unCheckGuest = useUnCheckGuest();

  async function onConfirmCheckIn() {
    return unCheck ? await unCheckGuest(id) : await checkinGuest(id);
  }

  return (
    <>
      <Modal
        maxWidth={600}
        isVisible={isVisible}
        hideModal={hideModal}
        title="Guest Details"
      >
        <ModalContainer>
          <DataRow>
            <RowLabel type="bold">Check In:</RowLabel>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                width: '67%',
              }}
            >
              <Checkbox
                aria-checked={!!is_checked}
                checked={!!is_checked}
                inversed
                name="check_in"
                onChange={() => {
                  setUncheck(!!is_checked);
                  setShouldDisplayCheckInModal(true);
                }}
                role="checkbox"
                tabIndex={0}
              />
            </div>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <RowLabel type="bold">Name:</RowLabel>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{ width: '67%', whiteSpace: 'normal' }}
            >
              {currentGuest ? `${last_name ?? ''}, ${first_name ?? ''}` : ''}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <RowLabel type="bold">Phone Number:</RowLabel>
            <Text type="bold" fontWeight="600" inlineStyle={{ width: '67%' }}>
              {phone_number && formatPhoneNumber(phone_number)}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <RowLabel type="bold">Additional Guests:</RowLabel>
            <Text type="bold" fontWeight="600" inlineStyle={{ width: '67%' }}>
              {additional_guests ? `+${additional_guests}` : 0}
            </Text>
          </DataRow>
          <Spacer size={15} />
          {notes && (
            <>
              <Spacer size={15} />
              <DataRow>
                <RowLabel type="bold">Notes:</RowLabel>
                <Text
                  type="bold"
                  fontWeight="600"
                  inlineStyle={{ width: '67%' }}
                >
                  {notes}
                </Text>
              </DataRow>
            </>
          )}
        </ModalContainer>
      </Modal>
      <CheckInModal
        itemType="guest"
        isVisible={shouldDisplayCheckInModal}
        onConfirm={onConfirmCheckIn}
        setIsVisible={setShouldDisplayCheckInModal}
        unCheck={unCheck}
      />
    </>
  );
};
GuestModal.propTypes = {
  currentGuest: PropTypes.shape({
    additional_guests: PropTypes.number,
    first_name: PropTypes.string,
    is_checked: PropTypes.bool,
    last_name: PropTypes.string,
    notes: PropTypes.string,
    phone_number: PropTypes.string,
  }),
  hideModal: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

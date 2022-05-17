import React from 'react';
import styled from 'styled-components';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { WaiverHeader } from './WaiverHeader';

const ModalWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  color: #000;
  background: #fff;
`;

const ModalBody = styled.div`
  padding: 20px;
`;
const LiText = styled(Text)`
  white-space: normal;
`;

export const EventParticipantNoWaiverAdult = () => {
  return (
    <>
      <ModalWrapper>
        <WaiverHeader />
        <ModalBody>
          <LiText>
            Participants can read and sign the Waiver and Release Agreement by
            viewing their pass in the My Passes section of their app, then
            tapping the orange "Sign Release Agreement" button on the pass.
            <Spacer size={10} />
            When the Waiver is Signed - the Waiver Not Signed Icon will
            disappear, the Participant’s QR code is Valid, Scannable and the
            Participant can be Checked In.
            <Spacer size={10} />
            You will then see the Waiver Icon, and be able to View or Download
            the Waiver.
          </LiText>
        </ModalBody>
      </ModalWrapper>
    </>
  );
};

import React from 'react';
import styled from 'styled-components';
import Spacer from 'components/Spacer';
import { WaiverNotSigned } from 'components/SVG/WaiverNotSigned';
import Text from 'components/Text';
const ModalHeader = styled.div`
  padding:15px;
  display:flex
  line-height: normal;
  background-color: rgb(250,70,22,0.1)
`;

const HeadingDiv = styled.div``;

export const WaiverHeader = () => {
  return (
    <ModalHeader>
      <HeadingDiv>
        <WaiverNotSigned width={60} style={{ padding: 5 }} />
      </HeadingDiv>
      <HeadingDiv>
        <Text fontSize={35} type="heading">
          Unable to Check this Participant In
        </Text>
        <Spacer size={1} />
        <Text fontSize={25} type="heading">
          Have This Participant Sign the Waiver In Their App!
        </Text>
      </HeadingDiv>
    </ModalHeader>
  );
};

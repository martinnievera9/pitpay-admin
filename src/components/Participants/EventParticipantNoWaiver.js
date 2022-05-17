import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Icon from 'components/Icon';
import { ModalHeaderContainer } from 'components/Modal/styles';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { WaiverHeader } from './WaiverHeader';

const Question = styled(Text)`
  margin-bottom: 1rem;
  white-space: normal;
`;

const List = styled.ul`
  list-style-position: outside;
  list-style-type: disc;
  margin-bottom: 1.5rem;
  padding: 0 1.5rem;
  text-align: left;
`;

const Li = styled.li``;

const LiText = styled(Text)`
  white-space: normal;
`;

const IconWrapper = styled.div`
  display: none;

  @media (max-width: 859px) {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
`;

export const EventParticipantNoWaiver = () => {
  const history = useHistory();
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const setModalState = () => {
    setShowAnswerModal(!showAnswerModal);
  };
  return (
    <>
      <IconWrapper>
        <Icon
          icon="close"
          size={18}
          color={'#fa4616'}
          onClick={() => {
            history.goBack();
          }}
        />
      </IconWrapper>
      <WaiverHeader />
      <Spacer size={10} />
      <Question
        forwardedAs="h2"
        type="heading"
        onClick={() => {
          setModalState();
        }}
      >
        How can the Participant resolve this?
      </Question>
      {showAnswerModal ? (
        <Question forwardedAs="h2" type="heading" color={'green'}>
          &#x21e7;
        </Question>
      ) : (
        <Question forwardedAs="h2" type="heading" color={'red'}>
          &#x21e9;
        </Question>
      )}
      <Spacer size={10} />

      {showAnswerModal ? (
        <ModalHeaderContainer>
          <List>
            <Li>
              <LiText>
                Resend Missing Signature Links to Participant on the Previous
                Screen
              </LiText>
            </Li>
            <Spacer size={10} />
            <Li>
              <LiText>
                Parent # 1 can always see what Waivers need to be signed by
                viewing the Minor's Pass in the My Passes section of their app
                and Tapping the orange "Sign Release Agreement” button. From
                this screen they can Resend Links for Parent #2 and Minor to
                Sign. The links to the required documents will be delivered via
                email and text message.
              </LiText>
            </Li>
            <Spacer size={10} />
            {/* <Li> */}
            <LiText>
              Some events require BOTH of the Parents AND the Minor to sign the
              Waiver and Release documents.
            </LiText>
          </List>
        </ModalHeaderContainer>
      ) : null}
    </>
  );
};

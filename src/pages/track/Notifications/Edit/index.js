import React, { useState } from 'react';
import styled from 'styled-components';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { Radio } from 'components/Form/Radio';
import { useMe } from 'hooks/useMe';
import PromoterLists from './PromoterLists';
import PushMessage from './PushMessage';
import TextMessage from './TextMessage';

const Label = styled.label`
  color: black;
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 4.2vw;
  display: block;
  margin-bottom: 15px;

  @media (min-width: 700px) {
    font-size: 16px;
  }
`;

const audienceOptions = {
  full: [
    {
      label: 'Users who have Favorited one of our Tracks',
      value: 'track-favorites',
    },
    {
      label: 'Users who have Favorited one of our Series',
      value: 'series-favorites',
    },
    {
      label: 'Event Participants',
      value: 'event-participants',
    },
  ],
  track: [
    {
      label: 'Users who have Favorited Us',
      value: 'track-favorites',
    },
    {
      label: 'Event Participants',
      value: 'event-participants',
    },
  ],
  series: [
    {
      label: 'Users who have Favorited Us',
      value: 'series-favorites',
    },
    {
      label: 'Event Participants',
      value: 'event-participants',
    },
  ],
};

const NotificationsEdit = ({ isVisible, handleOutClick }) => {
  const [messageType, setMessageType] = useState();
  const [clearChildState, setClearChildState] = useState(false);
  const { data } = useMe();

  if (!data.me) return null;

  return (
    <Drawer
      title="Message Center"
      isVisible={isVisible}
      handleOutClick={() => {
        setClearChildState(true);
        setMessageType('');
        handleOutClick();
      }}
    >
      <DrawerPadding>
        {messageType === 'text' ? <PromoterLists /> : null}

        <Label>Message Type</Label>
        <Radio
          options={[
            {
              label: 'App Push Notification',
              value: 'push',
            },
            {
              label: 'Text Message',
              value: 'text',
            },
          ]}
          onChange={(val) => {
            setMessageType(val.target.value);
          }}
          // onBlur={handleBlur}
          value={messageType}
        />
        {messageType === 'text' ? (
          <TextMessage
            onComplete={() => {
              setClearChildState(true);
              setMessageType('');
              handleOutClick();
            }}
            clearState={clearChildState}
            audienceOptions={audienceOptions}
          />
        ) : null}
        {messageType === 'push' ? (
          <PushMessage
            onComplete={() => {
              setClearChildState(true);
              setMessageType('');
              handleOutClick();
            }}
            clearState={clearChildState}
            audienceOptions={audienceOptions}
          />
        ) : null}
      </DrawerPadding>
    </Drawer>
  );
};

export default NotificationsEdit;

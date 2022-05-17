import React, { useState } from 'react';
import styled from 'styled-components';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { Radio } from 'components/Form/Radio';
import GetTracksSeries from '../gql/queries/getTracksSeries';
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

const NotificationsEdit = ({ isVisible, handleOutClick, data }) => {
  const [messageType, setMessageType] = useState();
  const [clearChildState, setClearChildState] = useState(false);
  if (!data.getTracks || !data.getSeries) return false;

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
          value={messageType}
        />
        {messageType === 'text' ? (
          <TextMessage
            data={data}
            onComplete={() => {
              setClearChildState(true);
              setMessageType('');
              handleOutClick();
            }}
            clearState={clearChildState}
          />
        ) : null}
        {messageType === 'push' ? (
          <PushMessage
            data={data}
            onComplete={() => {
              setClearChildState(true);
              setMessageType('');
              handleOutClick();
            }}
            clearState={clearChildState}
          />
        ) : null}
      </DrawerPadding>
    </Drawer>
  );
};

export default GetTracksSeries(NotificationsEdit);

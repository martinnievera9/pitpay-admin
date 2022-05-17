/* eslint-disable */
import React from 'react';
import { Drawer, DrawerPadding } from 'components/Drawer';
import { Input } from 'components/Form/Input';
import Spacer from 'components/Spacer';
import { formatTimestamp } from 'shared/formatters';

const NotificationView = ({ isVisible, handleOutClick, notification }) => {
  const getTarget = (item) =>
    item.track
      ? 'Track Favorites'
      : item.series
      ? 'Series Favorites'
      : item.event
      ? item.event
      : item.list
      ? item.list
      : null;

  if (!notification) return null;

  return (
    <Drawer
      title="Message Center"
      isVisible={isVisible}
      handleOutClick={() => {
        handleOutClick();
      }}
    >
      <DrawerPadding>
        {notification.title ? (
          <>
            <Input
              label="Title"
              placeholder="Title"
              name="title"
              readonly={true}
              onChange={() => {}}
              onBlur={() => {}}
              value={notification.title ? notification.title : ''}
            />
            <Spacer size={25} />
          </>
        ) : null}
        <Input
          label="Message"
          placeholder="Message"
          name="message"
          as="textarea"
          readonly={true}
          onChange={() => {}}
          onBlur={() => {}}
          value={notification.message ? notification.message : ''}
        />
        <Spacer size={25} />
        <Input
          label="Track / Series"
          name="track-series"
          readonly={true}
          onChange={() => {}}
          onBlur={() => {}}
          value={
            notification.track
              ? notification.track
              : notification.series
              ? notification.series
              : ''
          }
        />
        <Spacer size={25} />
        <Input
          label="Target"
          name="target"
          readonly={true}
          onChange={() => {}}
          onBlur={() => {}}
          value={getTarget(notification)}
        />
        <Spacer size={25} />
        <Input
          label="Time"
          name="time"
          readonly={true}
          onChange={() => {}}
          onBlur={() => {}}
          value={formatTimestamp(
            notification.unixTimestamp,
            'MMM DD-YYYY h:mm a'
          )}
        />
        <Spacer size={25} />
        <Input
          label="Users Targeted"
          name="time"
          readonly={true}
          onChange={() => {}}
          onBlur={() => {}}
          value={notification.num_users}
        />
        <Spacer size={25} />
        <Input
          label="Type"
          name="type"
          readonly={true}
          onChange={() => {}}
          onBlur={() => {}}
          value={
            notification.type
              ? notification.type.charAt(0).toUpperCase() +
                notification.type.slice(1)
              : ''
          }
        />
        <Spacer size={25} />
      </DrawerPadding>
    </Drawer>
  );
};

export default NotificationView;

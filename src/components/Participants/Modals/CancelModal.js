import React from 'react';
import { withRouter } from 'react-router';
import { useGetUserEvents } from '../gql';
import { CancelModal as Modal } from 'pages/app/Events/CancelModal';

export const CancelModal = withRouter(props => {
  const {
    close,
    selectedEvent,
    currentType,
    objectId,
    showCancelModal,
    adminTrack
  } = props;
  const { data } = useGetUserEvents();

  if (!data?.getUserEvents) return false;

  return (
    <div>
      <Modal
        adminTrack={adminTrack}
        showCancelModal={showCancelModal}
        close={() => close()}
        selectedEvent={selectedEvent}
        allEvents={data.getUserEvents.results}
        currentType={currentType}
        objectId={objectId}
      />
    </div>
  );
});

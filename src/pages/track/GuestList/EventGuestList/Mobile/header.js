import React from 'react';
import { useGetEvent } from '../../gql/useGetEvent';
import MobileContainer from 'components/MobileContainer';
import Text from 'components/Text';
import { DateCard } from 'components/DateCard';

const EventHeader = props => {
  const { noMargin } = props;

  const { data } = useGetEvent();
  const event = data?.getEvent;
  if (!event) return null;

  return (
    <>
      <MobileContainer>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div>
            <DateCard item={event} />
          </div>

          <div
            style={{ display: 'flex', flexDirection: 'column', marginLeft: 20 }}
          >
            <Text
              type="heading"
              color="#fff"
              inlineStyle={noMargin ? null : { marginRight: 50 }}
            >
              {event.name}
            </Text>
          </div>
        </div>
      </MobileContainer>
    </>
  );
};

export default EventHeader;

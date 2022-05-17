/* eslint-disable */

import React, { useState } from 'react';
import styled from 'styled-components';
import { EventStatusColorSelect } from 'components/Events';
import { Select } from 'components/Form/Select';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import { DateCard } from 'components/DateCard';

import {
  MainRow,
  HeaderMain,
  CardText,
  EventHeaderSection,
} from 'pages/app/Events/AddEvents/styles';
import { toast } from 'react-toastify';
import moment from 'moment';
import Spacer from 'components/Spacer';

const HeaderWrapper = styled.div`
  @media (min-width: 860px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 40px 40px 20px 40px;
  }
`;

const Header = styled.div`
  width: 80vw;
`;

const EventHeader = ({
  values,
  isMultiDay,
  title,
  eventId,
  status_color,
  ENHandleChange,
  ENHandleBlur,
  ENValues,
  ENErrors,
  ENTrack,
  EDSetFieldValue,
  SDValue,
  SDErrors,
  EDValue,
  EDErrors,
  editCheck,
  trackTitle,
  statusValues,
}) => {
  const theme = useTheme();
  let item = null;
  if (SDValue) {
    item = {
      date: moment(SDValue).format('MMM D'),
      day: moment(SDValue).format('ddd'),
      month: moment(SDValue).format('MMM'),
      end_date: moment(EDValue).format('MM-DD-YYYY'),
      isMultiDay: isMultiDay ?? true,
      listDates:
        moment(SDValue).format('DD') +
        ' - ' +
        (EDValue ? moment(EDValue).format('DD') : ''),
    };
  }
  return (
    <>
      <HeaderWrapper>
        <Header>
          <div
            style={{
              display: 'flex',
              alignItems: 'right',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', width: '80%' }}
            >
              <div>
                {item !== null && (
                  <DateCard item={item} margin={'margin: 0 10px 0 0'} />
                )}
              </div>
              <div>
                <div>
                  <Text
                    type="heading"
                    fontSize={32}
                    color={theme.colors.secondary}
                  >
                    {ENValues}
                  </Text>
                </div>
                <div>
                  <Text
                    type="heading"
                    fontSize={25}
                    color={theme.colors.secondary}
                  >
                    {values.track_id ? values.track_id.label : ''}
                  </Text>
                </div>
              </div>
            </div>

            <div style={{ width: '20%', display: 'flex' }}>
              <div style={{ width: '70%' }}>
                <Select
                  id="status"
                  label="Status"
                  placeholder="Status"
                  options={[
                    { label: 'Draft', value: 'draft' },
                    { label: 'Published', value: 'published' },
                    { label: 'Postponed', value: 'postponed' },
                    { label: 'Cancelled', value: 'cancelled' },
                  ]}
                  onChange={ENHandleChange}
                  onBlur={ENHandleBlur}
                  value={statusValues}
                  error={ENErrors}
                />
              </div>
              <div style={{ width: '30%', paddingLeft: '5px' }}>
                <Spacer size={35} />
                <CardText>
                  {editCheck ? (
                    <EventStatusColorSelect
                      eventId={eventId}
                      statusColor={status_color}
                    />
                  ) : null}
                </CardText>
              </div>
            </div>
          </div>
        </Header>
      </HeaderWrapper>
    </>
  );
};

export default EventHeader;

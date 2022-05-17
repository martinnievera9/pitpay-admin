/* eslint-disable */
import React from 'react';
import { Button } from 'components/Button';
import AddedBy from 'pages/app/Events/EventEdit/addedBy';
import { Select } from 'components/Form/Select';
import Spacer from 'components/Spacer';
import Ownership from 'pages/app/Events/EventEdit/Dropdown/ownership';
import { SideBarMain, SideBarBody } from 'pages/app/Events/AddEvents/styles';

const EditEventSidebar = ({
  addedByValues,
  addedByErrors,
  addedByTouched,
  addedBySetFieldValue,
  addedByCurrentSeries,
  addedSetFieldTouched,
  statusHandleChange,
  statusHandleBlur,
  statusValues,
  statusErrors,
  currentEvent,
  isSubmitting,
  ownerValues,
  addedByCurrentTrack,
}) => {
  return (
    <SideBarMain>
      <SideBarBody>
        <div>
          <div>
            <AddedBy
              value={addedByValues}
              errors={addedByErrors}
              touched={addedByTouched}
              setFieldValue={addedBySetFieldValue}
              currentSeries={addedByCurrentSeries}
              setFieldTouched={addedSetFieldTouched}
            />
            <Spacer size={18} />
            <Ownership
              values={ownerValues}
              errors={addedByErrors}
              touched={addedByTouched}
              id={currentEvent ?? addedByCurrentTrack}
              setFieldValue={addedBySetFieldValue}
              currentSeries={addedByCurrentSeries}
              currentTrack={addedByCurrentTrack}
              currentEvent={currentEvent}
              setFieldTouched={addedSetFieldTouched}
            />
            <Spacer size={18} />
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
              onChange={statusHandleChange}
              onBlur={statusHandleBlur}
              value={statusValues}
              error={statusErrors}
            />
          </div>
        </div>
        <div
          style={{
            marginBlock: 10,
          }}
        >
          <Button type="submit" disabled={isSubmitting} block>
            {currentEvent ? 'Update Event' : 'Add Event'}
          </Button>
        </div>
      </SideBarBody>
    </SideBarMain>
  );
};

export default EditEventSidebar;

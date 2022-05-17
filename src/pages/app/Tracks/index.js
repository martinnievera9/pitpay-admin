import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import Icon from 'components/Icon';
import LineHeightText from 'components/LineHeightText';
import { SearchableListContainer } from 'components/SearchableListContainer';
import { Table } from 'components/Table';
import { formatPhoneNumber } from 'shared/formatters';
import DeleteTrack from './gql/mutations/delete-track';
import GetTracks from './gql/queries/get-tracks';
import { TrackEdit } from './TrackEdit';

const Tracks = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [editTrack, setEditTrack] = useState(null);

  if (!props.data.getTracksAdmin) return null;

  const columns = [
    {
      label: 'Track',
      key: 'track',
    },
    {
      label: 'Address',
      key: 'address',
    },
    {
      label: 'Track Type',
      key: 'type',
    },
    {
      label: 'Phone',
      key: 'phone',
    },
    {
      label: 'Time Zone',
      key: 'timezone',
    },
    {
      label: 'Status',
      key: 'status',
    },

    {
      label: '',
      key: 'actions',
    },
  ];

  function renderRows(track) {
    const { id, name, fullAddress, type, phone, timezone, status } = track;
    return {
      track: (
        <Link
          style={{ color: props.theme.colors.primary }}
          to={`/admin/track/events/${id}`}
        >
          <LineHeightText> {name}</LineHeightText>
        </Link>
      ),
      address: fullAddress,
      type: type?.key ?? '',
      phone: formatPhoneNumber(phone),
      timezone,
      status,
      actions: (
        <>
          <Icon
            icon="edit"
            size={18}
            color={props.theme.colors.primary}
            onClick={async () => {
              setEditTrack(id);
              setIsVisible(!isVisible);
            }}
            padding="0 15px 0 0"
          />
          <Icon
            icon="trash"
            size={18}
            color={props.theme.colors.primary}
            onClick={async () => {
              const successMessage = () =>
                toast.success('Track Successfully Deleted');
              const errorMessage = () => toast.error('Error Deleting Track');

              if (
                window.confirm('Are you sure you want to delete this track?')
              ) {
                const response = await props.deleteTrack(id);
                if (!response || response.errors) {
                  errorMessage();
                }
                successMessage();
              }
            }}
          />
        </>
      ),
    };
  }

  const handleOutClick = () => {
    setIsVisible(!isVisible);
    setEditTrack(null);
  };

  return props.data.loading ? null : (
    <>
      <SearchableListContainer
        pageCount={props.data.getTracksAdmin.count}
        paginated
        onAddClick={() => setIsVisible(!isVisible)}
        title="Tracks"
        searchInputPlaceholder="Search Tracks"
      >
        <Table
          items={props.data.getTracksAdmin.results}
          columns={columns}
          renderRows={renderRows}
        />
      </SearchableListContainer>
      <TrackEdit
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        currentTrack={editTrack}
      />
    </>
  );
};

export default withTheme(compose(GetTracks, DeleteTrack)(Tracks));

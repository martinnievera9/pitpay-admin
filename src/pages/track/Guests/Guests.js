import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LinkButton } from 'components/Button';
import { HideOnMobile, HideOnDesktop } from 'components/Card/cardStyle';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import ContainerIcon from 'components/ContainerIcon';
import { AutoSuggest } from 'components/Form/AutoSuggest';
import Icon from 'components/Icon';
import { ConfirmModal } from 'components/Modal';
import { ModalSmsNotification } from 'components/ModalSmsNotification';
import Pagination from 'components/Pagination';
import { Table } from 'components/Table';
import Text from 'components/Text';
import useTheme from 'hooks/useTheme';
import {
  logDevError,
  deleteErrorMessage,
  deleteSuccessMessage,
} from 'shared/alerts';
import { formatPhoneNumber } from 'shared/formatters';
import { GET_GUESTS, useGetGuests, useDeleteGuest } from './gql';
import { GuestForm } from './GuestForm';
import {
  GuestSearch,
  useGuestSearch,
  withGuestSearchContext,
} from './GuestSearch';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & > :not(:last-child) {
    margin-right: 25px;
  }

  @media (max-width: 860px) {
    display: block;
    flex: 1;
    & > :not(:last-child) {
      margin-right: 0;
      margin-bottom: 25px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: 860px) {
    height: auto;
    padding: 20px;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const GuestListsButtonWrapper = styled.div`
  margin-right: 25;
  height: 100%;
  padding-top: 20px;
  display: none;

  @media (min-width: 860px) {
    display: block;
  }
`;

const AddIcon = styled(ContainerIcon)`
  @media (max-width: 860px) {
    padding: 0;
  }
`;

const GuestListButtonWrapperMobile = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.colors.border};
  border-style: solid;

  @media (min-width: 860px) {
    display: none;
  }
`;

const FilterContainer = styled.div`
  min-width: 230px;
`;

export const Guests = withGuestSearchContext(() => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldDisplayDeleteModal, setShouldDisplayDeleteModal] = useState(
    false
  );
  const [newGuestData, setNewGuestData] = useState(null);
  const { guestSearchQuery: queryString } = useGuestSearch();
  const [guestId, setGuestId] = useState(null);
  const [guestTypeFilter, setGuestTypeFilter] = useState(null);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const { data } = useGetGuests({ queryString });
  const deleteGuest = useDeleteGuest();

  const handleOutClick = () => {
    setIsVisible(!isVisible);
    setGuestId(null);
  };

  async function handleDeleteGuestConfirm() {
    try {
      deleteGuest({
        variables: { id: guestId },
        update: (cache) => {
          const data = cache.readQuery({
            query: GET_GUESTS,
            variables: { input: { queryString } },
          });
          if (data) {
            const updatedResults = data.getGuests.results.filter(
              (guest) => guest.id !== guestId
            );
            cache.writeQuery({
              query: GET_GUESTS,
              variables: { input: { queryString } },
              data: {
                ...data,
                getGuests: {
                  ...data.getGuests,
                  count: data.getGuests.count - 1,
                  results: updatedResults,
                },
              },
            });
          }
        },
      });
      deleteSuccessMessage('Guest');
    } catch (error) {
      logDevError(error);
      deleteErrorMessage('Guest');
    } finally {
      setShouldDisplayDeleteModal(false);
    }
  }

  async function onSetNewGuestData(guest) {
    setNewGuestData(guest);
  }

  const urlParams = new URLSearchParams(window.location.queryString);
  const currentPage = parseInt(urlParams.get('page'));

  const guests =
    data?.getGuests.results &&
    data.getGuests.results.filter((result) =>
      guestTypeFilter?.value === 'year'
        ? !!result.year
        : guestTypeFilter?.value === 'event'
        ? !!result.event_id
        : true
    );
  const count = data?.getGuests.count;

  const columns = [
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Phone Number',
      key: 'phone_number',
    },
    {
      label: 'Date',
      key: 'date',
    },
    {
      label: 'Event',
      key: 'event',
    },
    {
      label: 'Additional Guests',
      key: 'additional_guests',
    },
    {
      label: '',
      key: 'actions',
    },
  ];

  function renderRows(guest) {
    const {
      id,
      last_name,
      first_name,
      phone_number,
      event,
      ownership,
      year,
      additional_guests,
    } = guest;
    return {
      name: `${last_name}, ${first_name}`,
      phone_number: formatPhoneNumber(phone_number),
      date: year ?? dayjs(event?.fullDate).format('MMM DD - YYYY') ?? '',
      event: event?.name ?? ownership?.label ?? '',
      additional_guests: additional_guests ? `+${additional_guests}` : '0',
      actions: (
        <>
          <Icon
            icon="edit"
            size={18}
            color={theme.colors.primary}
            onClick={async () => {
              setGuestId(id);
              setIsVisible(!isVisible);
            }}
            padding="0 15px 0 0"
          />
          <Icon
            icon="trash"
            size={18}
            color={theme.colors.primary}
            onClick={() => {
              setGuestId(id);
              setShouldDisplayDeleteModal(true);
            }}
          />
        </>
      ),
    };
  }

  return !guests ? null : (
    <>
      <Container>
        <ContainerHeader
          borderWidth={isMobile ? '0px' : '1px'}
          style={{ position: 'relative' }}
        >
          <TitleContainer>
            <Text
              type="heading"
              color={theme.colors.secondary}
              inlineStyle={{
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            >
              Guests
            </Text>
            <GuestSearch />
            <FilterContainer>
              <AutoSuggest
                placeholder="View"
                options={[
                  {
                    label: 'Full Season Guests',
                    value: 'year',
                  },
                  {
                    label: 'Single Event Guests',
                    value: 'event',
                  },
                ]}
                value={guestTypeFilter}
                onChange={setGuestTypeFilter}
                isClearable
              />
            </FilterContainer>
          </TitleContainer>
          <ButtonContainer>
            <GuestListsButtonWrapper
              style={{
                marginRight: 25,
                height: '100%',
                paddingTop: 20,
              }}
            >
              <LinkButton to={'/admin-track/guest-lists'}>
                View Guest Lists
              </LinkButton>
            </GuestListsButtonWrapper>
            <AddIcon
              onClick={() => {
                setIsVisible(!isVisible);
              }}
            />
          </ButtonContainer>
        </ContainerHeader>
        <GuestListButtonWrapperMobile>
          <LinkButton to={'/admin-track/guest-lists'}>
            View Guest Lists
          </LinkButton>
        </GuestListButtonWrapperMobile>

        <div style={{ padding: 20 }}>
          <HideOnMobile>
            <Table columns={columns} items={guests} renderRows={renderRows} />
          </HideOnMobile>
          <HideOnDesktop>
            {guests.map((item) => (
              <Link
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  marginBottom: 20,
                }}
                to={{
                  pathname: `/admin-track/guests/${item.id}`,
                  state: { queryString },
                }}
              >
                <Text
                  type="heading"
                  color="#00001f"
                  inlineStyle={{ textTransform: 'uppercase' }}
                >
                  {`${item.last_name}, ${item.first_name}`}
                </Text>
                <div style={{ transform: 'rotate(-90deg)' }}>
                  <Icon size={22} icon="chevron" color="#fa4616" />
                </div>
              </Link>
            ))}
          </HideOnDesktop>
        </div>

        <Pagination count={count} perPage={15} currentPage={currentPage || 1} />
      </Container>

      <GuestForm
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        guestId={guestId}
        queryString={queryString}
        setNewGuestData={onSetNewGuestData}
      />

      <ConfirmModal
        isVisible={shouldDisplayDeleteModal}
        confirmText="Delete Guest"
        cancelText="Don't Delete"
        onConfirm={handleDeleteGuestConfirm}
        title="Do you want to delete this Guest?"
        hideModal={() => {
          setShouldDisplayDeleteModal(false);
        }}
      />

      <ModalSmsNotification
        isVisible={newGuestData !== null}
        cancelText="Close"
        title="New Guest Added"
        cellphone={newGuestData?.phone_number}
        body={`${newGuestData?.first_name} ${newGuestData?.last_name}, has been added, you can send them a message at this time.`}
        hideModal={() => {
          setNewGuestData(null);
        }}
      />
    </>
  );
});

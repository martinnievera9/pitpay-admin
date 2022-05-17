/* eslint-disable no-unused-vars */
import qs from 'qs';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { HideOnMobile, ContainerWrapper } from 'components/Card/cardStyle';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import { DateCard } from 'components/DateCard';
import { Checkbox } from 'components/Form/Checkbox';
import { SearchInput } from 'components/Form/SearchInput';
import Icon from 'components/Icon';
import Loading from 'components/Loading';
import {
  useCheckInUser,
  useGetTicketsList,
  useUncheckInUser,
} from 'components/Participants/gql';
import { CancelModal, PassesModal } from 'components/Participants/Modals';
import { Table, TableRow } from 'components/Table';
import Text from 'components/Text';
import useNewTicket from 'hooks/useNewTicket';
import useTheme from 'hooks/useTheme';
import DateDropdown from './dateDropdown';
import HeaderButtons from './HeaderButtons';

const TitleContainer = styled.div`
  @media (min-width: 860px) {
    display: flex;
    flex-direction: row;
  }
`;

const NameLink = styled(Link)`
  background-color: transparent;
  padding: 0;
  margin: 0;
  display: inline-block;
  color: ${(props) => props.theme.colors.primary};
  border: none;
  font-size: 16px;
  font-family: Roboto;
  text-decoration: underline;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;
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

const Tr = styled(TableRow)`
  & > :first-child {
    padding-left: 20px;
  }
  & > :last-child {
    padding-right: 20px;
  }
`;

const PassesButton = styled.button`
  padding: 0;
  margin-left: auto;
  margin-right: 40px;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;

  &:focus {
    outline: 0;
  }
`;

const IconWrapper = styled.span`
  transform: rotate(-90deg);
  display: block;
  margin-left: 10px;
`;

const Tickets = (props) => {
  const { location, match } = props;
  const { date } = qs.parse(location.search.substring(1));
  const [search, setSearch] = useState('');
  const { data, subscribeToMore } = useGetTicketsList({
    date,
    search,
  });

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSelectedEvent, setShowSelectedEvent] = useState({});
  const [showPasses, setShowPasses] = useState(false);
  const theme = useTheme();

  const eventId = parseInt(match.params.id, 10);
  useNewTicket({ subscribeToMore }, eventId, search, date);
  const checkInUser = useCheckInUser();
  const uncheckInUser = useUncheckInUser();
  const [storedCheckins, setStoredCheckins] = useState([]);
  const [storedUnChecks, setStoredUnChecks] = useState([]);
  const [unCheck, setUncheck] = useState(false);
  const [purchaseItem, setPurchaseItem] = useState(false);
  const selectOne = async (item) => {
    // check if it's already selected
    if (item.is_checked) {
      setStoredUnChecks((prev) => [...new Set(prev.concat(item.id))]);
    } else {
      setStoredCheckins((prev) => [...new Set(prev.concat(item.id))]);
    }

    return item.is_checked
      ? await uncheckInUser([item.id])
      : await checkInUser([item.id]);
  };

  const adminTrack = location.pathname.indexOf('/admin-track/');

  const handleChange = (e) => setSearch(e.target.value);

  const handleBlur = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };

  const Tickets = data?.getSpectatorTickets;
  const event = data?.getEvent;

  useEffect(() => {
    if (!event) return;

    setShowSelectedEvent({ ...event });
  }, [event]);

  const tableColumns = [
    {
      label: 'Check In',
      key: 'check_in',
    },
    {
      label: 'Holder',
      key: 'holder',
    },
    {
      label: 'Ticket Name',
      key: 'ticket_name',
    },
    {
      label: 'Ticket Number',
      key: 'barcode',
    },

    {
      label: 'Purchaser',
      key: 'user_name',
    },
  ];
  function renderRows(participant, index) {
    const { is_checked, user, barcode } = participant;

    return {
      rowProps: {},
      holder: participant.transfer
        ? `${participant.transfer.last_name}, ${participant.transfer.first_name}`.toUpperCase()
        : `${user.last_name}, ${user.first_name}`.toUpperCase(),
      check_in: (
        <Checkbox
          inversed
          name="checkbox1"
          checked={is_checked}
          check={is_checked}
          onChange={async () => {
            setPurchaseItem(participant);
            setUncheck(participant.is_checked);
            const response = await selectOne(participant);
            const srch = search;

            if (response?.data?.uncheckInUser) {
              toast.success('Succesfully unchecked ticket');
            }

            if (response?.data?.checkInUser) {
              toast.success('Succesfully checked in ticket');
            }

            if (response?.error) {
              if (participant.is_checked) {
                toast.success('Unable to uncheck ticket');
              } else {
                toast.success('Unable to check in ticket');
              }
            }

            setSearch('a');

            setSearch(srch);
          }}
          size={[36, 20, 3]}
        />
      ),
      ticket_name: participant.ticket.name.toUpperCase(),
      barcode: barcode,
      user_name: (
        <NameLink
          highlight={'orange'}
          to={(location) => ({
            ...location,
            pathname: `${location.pathname}/${participant.id}`,
          })}
        >
          {`${user.last_name}, ${user.first_name}`.toUpperCase()}
        </NameLink>
      ),
    };
  }

  return !event ? (
    <Loading size={60} />
  ) : (
    <>
      <HeaderWrapper>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <DateCard item={event} margin={'margin: 0 10px 0 0'} />

            <Text type="heading" fontSize={32} color={theme.colors.secondary}>
              {event.name}
            </Text>

            {'postponed' === event.status ? (
              <img
                style={{
                  width: '10%',
                  height: 'auto',
                  display: 'block',
                  marginLeft: 20,
                  transform: 'rotate(10deg)',
                }}
                src="https://d3294qt0f4hbwl.cloudfront.net/postponed.png"
                alt="postponed-stamp"
              />
            ) : null}
            {'cancelled' === event.status ? (
              <img
                style={{
                  width: '10%',
                  height: 'auto',
                  display: 'block',
                  marginLeft: 20,
                }}
                src="https://d3294qt0f4hbwl.cloudfront.net/cancelled.png"
                alt="cancelled-stamp"
              />
            ) : null}
          </div>
        </Header>
        <HeaderButtons
          event={event}
          date={date}
          match={match}
          setShowCancelModal={setShowCancelModal}
        />
        <div style={{ width: '20%', marginLeft: 40 }}>
          <img
            style={{ width: '100%', height: 'auto', display: 'block' }}
            src={event.track?.logo ?? event.series?.logo}
            alt="logo"
          />
        </div>
      </HeaderWrapper>{' '}
      {!Tickets || !event ? null : (
        <Container>
          <ContainerHeader>
            <ContainerWrapper>
              <TitleContainer>
                <Text
                  type="heading"
                  color="#3C4144"
                  inlineStyle={{ marginRight: 25, marginBottom: 10 }}
                >
                  Tickets
                </Text>
                <SearchInput
                  placeholder="Search Tickets"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyPress}
                  value={search}
                  style={{ width: 200 }}
                />
              </TitleContainer>
              <DateDropdown />
              <PassesButton
                onClick={() => {
                  setShowPasses(true);
                }}
              >
                <Text
                  type="label"
                  fontSize={18}
                  color={theme.colors.secondary}
                  inlineStyle={{ cursor: 'pointer' }}
                >
                  Passes on Sale
                </Text>
                <IconWrapper>
                  <Icon icon="chevron" size={24} color={theme.colors.primary} />
                </IconWrapper>
              </PassesButton>
            </ContainerWrapper>
          </ContainerHeader>
          <div style={{ padding: '20px 0' }}>
            <HideOnMobile>
              <Table
                items={Tickets ?? []}
                columns={tableColumns}
                Components={{ Row: Tr }}
                renderRows={renderRows}
                noData={
                  <p
                    style={{
                      color: '#000',
                      fontSize: 20,
                      fontFamily: 'Barlow Condensed',
                      fontWeight: 600,
                      padding: 20,
                    }}
                  >
                    The event does not have any Tickets yet
                  </p>
                }
              />

              {showCancelModal && (
                <CancelModal
                  adminTrack={adminTrack}
                  showCancelModal={showCancelModal}
                  close={() => {
                    setShowCancelModal(false);
                  }}
                  selectedEvent={showSelectedEvent}
                  currentType={match.url.includes('track') ? 'track' : 'series'}
                  objectId={match.params.id}
                />
              )}

              {showPasses && (
                <PassesModal
                  showModal={showPasses}
                  close={() => {
                    setShowPasses(false);
                  }}
                />
              )}
            </HideOnMobile>
          </div>
          {/*  {ticket ? (
            <TicketModal
              location={location}
              admin={location.pathname.includes('/admin/transactions/')}
              match={match}
              ticket={ticket}
              close={() => {
                const srch = search;
                setSearch('a');
                setTicket(null);

                setSearch(srch);
              }}
            />
          ) : null} */}
        </Container>
      )}
    </>
  );
};

export default Tickets;

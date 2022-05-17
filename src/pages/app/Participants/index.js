import qs from 'qs';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HideOnMobile, ContainerWrapper } from 'components/Card/cardStyle';
import Container from 'components/Container';
import { DateCard } from 'components/DateCard';
import { Checkbox } from 'components/Form/Checkbox';
import ContainerHeader from 'components/ContainerHeader';
import { SearchInput } from 'components/Form/SearchInput';
import Icon from 'components/Icon';
import Loading from 'components/Loading';
import { WaiverDownloadButton } from 'components/Participants';
import { useGetParticipantsList } from 'components/Participants/gql';
import { CancelModal, PassesModal } from 'components/Participants/Modals';
import { WaiverNotSigned } from 'components/SVG/WaiverNotSigned';
import { Table, TableRow } from 'components/Table';
import Text from 'components/Text';
import useNewPurchase from 'hooks/useNewPurchase';
import useTheme from 'hooks/useTheme';
import DateDropdown from './dateDropdown';
import HeaderButtons from './HeaderButtons';

const TitleContainer = styled.div`
  @media (min-width: 860px) {
    display: flex;
    flex-direction: row;
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

const isFullyChecked = ({ tickets }) => {
  const isComplete = tickets.filter(
    (ticket) => ticket.is_checked || ticket.status === 'refunded'
  );
  return isComplete.length === tickets.length;
};

const IconWrapper = styled.span`
  transform: rotate(-90deg);
  display: block;
  margin-left: 10px;
`;

const Participants = (props) => {
  const { location, match } = props;
  const { date } = qs.parse(location.search.substring(1));
  const [search, setSearch] = useState('');
  const { data, loading, subscribeToMore } = useGetParticipantsList({
    date,
    search,
  });

  const [isChecked, setIsChecked] = useState([]);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSelectedEvent, setShowSelectedEvent] = useState({});
  const [showPasses, setShowPasses] = useState(false);
  const theme = useTheme();

  const eventId = parseInt(match.params.id, 10);
  useNewPurchase({ subscribeToMore }, eventId, search, date);

  const selectOne = (id) => {
    // check if it's already selected
    const found = isChecked.indexOf(id);
    // remove from selected array
    if (found > -1) {
      return setIsChecked(isChecked.filter((e) => e !== id));
    }
    // add to selected array
    return setIsChecked([...isChecked, id]);
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

  const participants = data?.getParticipantsList;
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
      label: 'Name',
      key: 'name',
    },
    {
      label: 'Duty',
      key: 'duty',
    },
    {
      label: 'Age',
      key: 'age',
    },
    {
      label: 'Promo',
      key: 'promo',
    },
    {
      label: 'Waiver',
      key: 'waiver',
    },
  ];

  function renderRows(participant, index) {
    const {
      status,
      name,
      is_pending,
      duty,
      age,
      promo_code,
      pass_id,
    } = participant;
    return {
      rowProps: {
        highlight: is_pending ? 'orange' : undefined,
      },
      check_in: (
        <Checkbox
          inversed
          disabled={is_pending}
          name="checkbox1"
          checked={isFullyChecked(participant)}
          onChange={
            !is_pending
              ? () => selectOne(index)
              : () => {
                  return;
                }
          }
          size={[36, 20, 3]}
          check={status !== 'refunded'}
        />
      ),
      name: (
        <NameLink
          highlight={is_pending ? 'orange' : undefined}
          to={(location) => ({
            ...location,
            pathname: `${location.pathname}/${participant.id}`,
          })}
        >
          {name.toUpperCase()}
        </NameLink>
      ),
      duty,
      age,
      promo: promo_code,
      waiver: is_pending ? (
        <WaiverNotSigned width={40} style={{ padding: 5 }} />
      ) : pass_id ? (
        <WaiverDownloadButton
          passId={pass_id}
          icon={
            <Icon icon="Waiver-Icon" color={theme.colors.primary} size={40} />
          }
        />
      ) : null,
    };
  }

  return loading ? (
    <Loading size={60} />
  ) : !participants || !event ? null : (
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
      </HeaderWrapper>
      <Container>
        <ContainerHeader>
          <ContainerWrapper>
            <TitleContainer>
              <Text
                type="heading"
                color="#3C4144"
                inlineStyle={{ marginRight: 25, marginBottom: 10 }}
              >
                Participants
              </Text>
              <SearchInput
                placeholder="Search Participants"
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
              items={participants ?? []}
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
                  The event does not have any participants yet
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
      </Container>
    </>
  );
};

export default Participants;

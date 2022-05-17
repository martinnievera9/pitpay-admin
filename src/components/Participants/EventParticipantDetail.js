import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Button } from 'components/Button';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import Icon from 'components/Icon';
import { CheckInModal } from 'components/Modal';
import Spacer from 'components/Spacer';
import Text from 'components/Text';
import { useOfflineCheck } from 'hooks/useOfflineCheck';
import { useSearchInput } from 'hooks/useSearchInput';
import useTheme from 'hooks/useTheme';
import { formatPhoneNumber } from 'shared/formatters';
import { EventParticipantNoWaiver } from './EventParticipantNoWaiver';
import { EventParticipantNoWaiverAdult } from './EventParticipantNoWaiverAdult';
import {
  useGetStoredPurchaseIds,
  useCheckInUser,
  useUncheckInUser,
} from './gql/useCheckInUser';
import { useGetParticipant } from './gql/useGetParticipant';
import { ParticipantPasses } from './ParticipantPasses';
import { WaiverDownloadButton } from './WaiverDownloadButton';
import { WaiverLinks } from './WaiverLinks';

const TitleContainer = styled(ContainerHeader)`
  padding: 0 40px;

  @media (max-width: 859px) {
    align-items: flex-start;
    padding: 20px;
    & > h1 {
      margin-bottom: 6px;
    }
  }
`;

const Content = styled.section`
  padding: 20px;
`;

const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 859px) {
    display: block;
  }
`;

const OfflineWarning = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.heading.fontFamily};
  font-size: 1.375rem;
  font-weight: ${(props) => props.theme.fonts.heading.fontWeight};
  line-height: 19px;
  padding: 8px;
  margin: 0 12px;
  text-transform: uppercase;
`;

const IconWrapper = styled.div`
  display: none;

  @media (max-width: 859px) {
    display: block;
  }
`;

const MinorAge = styled.div`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 5px;
  width: 45px;
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  padding: 0 5px;
`;

const MinorHeaderInfo = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 859px) {
    margin-top: 20px;
  }
`;

const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AllPassesButtons = styled.div`
  display: flex;
  flex-direction: column;
  & > :first-child {
    margin-bottom: 12px;
  }

  @media (min-width: 859px) {
    flex-direction: row;
    & > :first-child {
      margin-right: 12px;
      margin-bottom: 0;
    }
  }
`;

export const EventParticipantDetail = () => {
  const [shouldDisplayCheckInModal, setShouldDisplayCheckInModal] =
    useState(false);
  const [unCheck, setUncheck] = useState(false);
  const [purchaseItem, setPurchaseItem] = useState(false);

  // We need this to update button/checkbox state when offline, because
  // changes to local storage don't cause a re-render.
  const [storedCheckins, setStoredCheckins] = useState([]);
  const [storedUnChecks, setStoredUnChecks] = useState([]);

  const isOffline = useOfflineCheck();
  const getStoredPurchaseIds = useGetStoredPurchaseIds();
  const theme = useTheme();
  const history = useHistory();
  const { pathname, search } = useLocation();
  const { input } = useSearchInput();
  const checkInUser = useCheckInUser();
  const uncheckInUser = useUncheckInUser();
  const { date } = input ?? {};

  useEffect(() => {
    if (isOffline) {
      const storedPurchaseIdsToCheckIn = getStoredPurchaseIds('check');
      const storedPurchaseIdsToUnCheck = getStoredPurchaseIds('uncheck');
      setStoredCheckins(storedPurchaseIdsToCheckIn);
      setStoredUnChecks(storedPurchaseIdsToUnCheck);
    }
  }, [isOffline, getStoredPurchaseIds]);

  const { data } = useGetParticipant();
  const currentUser = data?.getParticipant;

  if (!date || !currentUser) return null;

  const {
    status,
    name,
    duty,
    age,
    promo_code,
    pass_id,
    is_pending,
    birthday,
    parents,
    tickets,
  } = currentUser;

  const allTicketsStoredToCheckIn = tickets.reduce(
    (allStored, ticket) =>
      !allStored ? allStored : storedCheckins.includes(ticket.id),
    true
  );
  const allTicketsStoredToUnCheck = tickets.reduce(
    (allStored, ticket) =>
      !allStored ? allStored : storedUnChecks.includes(ticket.id),
    true
  );
  const isAllCheckedIn = tickets.reduce(
    (allChecked, ticket) => (!allChecked ? allChecked : !!ticket.is_checked),
    true
  );
  const isAllUnCheckedIn = tickets.reduce(
    (allUnChecked, ticket) =>
      !allUnChecked ? allUnChecked : !ticket.is_checked,
    true
  );

  const disableCheckInButton = isOffline
    ? allTicketsStoredToCheckIn || isAllCheckedIn
    : isAllCheckedIn;
  const disableUnCheckButton = isOffline
    ? allTicketsStoredToUnCheck || isAllUnCheckedIn
    : isAllUnCheckedIn;

  async function checkInAllPasses() {
    function onSuccess() {
      toast.success('Succesfully checked in for all passes');
      const listPage = pathname
        .split('/')
        .slice(0, -1)
        .join('/')
        .concat(search);
      history.push(listPage);
    }

    const onError = () => toast.error("Couldn't complete check in");

    const purchase_ids = tickets.map((ticket) => ticket.id);
    setStoredCheckins(purchase_ids);
    await checkInUser(purchase_ids, onSuccess, onError);
  }

  async function uncheckAllPasses() {
    function onSuccess() {
      toast.success('Unchecked all passes');
      const listPage = pathname
        .split('/')
        .slice(0, -1)
        .join('/')
        .concat(search);
      history.push(listPage);
    }

    const onError = () => toast.error("Couldn't uncheck all passes");

    const purchase_ids = tickets.map((ticket) => ticket.id);
    setStoredUnChecks(purchase_ids);
    await uncheckInUser(purchase_ids, onSuccess, onError);
  }

  async function onConfirmCheckIn() {
    if (unCheck) {
      setStoredUnChecks((prev) => [...new Set(prev.concat(purchaseItem.id))]);
    } else {
      setStoredCheckins((prev) => [...new Set(prev.concat(purchaseItem.id))]);
    }
    return unCheck
      ? uncheckInUser([purchaseItem.id])
      : checkInUser([purchaseItem.id]);
  }

  return is_pending ? (
    <Container style={{ maxWidth: 600 }}>
      <Content>
        {currentUser.age < 18 ? ( // Minor Participants Case handling
          <>
            <EventParticipantNoWaiver />
            <TitleContainer>
              <TitleContent>
                <Text type="heading">Participant Details</Text>
                {isOffline && (
                  <OfflineWarning>
                    Your are offline. Changes will sync when connectivity
                    returns.
                  </OfflineWarning>
                )}
                {currentUser && currentUser.parents.length ? (
                  <MinorHeaderInfo>
                    <Text
                      color="#fa4616"
                      inlineStyle={{
                        fontWeight: 800,
                        fontSize: 28,
                        fontFamily: 'Barlow Condensed',
                      }}
                    >
                      MINOR
                    </Text>
                    <MinorAge>
                      <Text
                        color="#FFF"
                        inlineStyle={{
                          fontWeight: 400,
                          fontFamily: 'Barlow Condensed',
                          fontSize: 20,
                        }}
                      >
                        UNDER
                      </Text>
                      <Text
                        color="#FFF"
                        inlineStyle={{
                          fontWeight: 800,
                          fontFamily: 'Barlow Condensed',
                          fontSize: 20,
                        }}
                      >
                        18
                      </Text>
                    </MinorAge>
                  </MinorHeaderInfo>
                ) : (
                  <span>&nbsp;</span>
                )}
              </TitleContent>
            </TitleContainer>
            <Content>
              <DataRow>
                <Text
                  type="bold"
                  color={theme.colors.text.gray}
                  inlineStyle={{ width: '30%' }}
                >
                  Name:
                </Text>
                <Text
                  type="bold"
                  fontWeight="600"
                  inlineStyle={{ width: '70%', whiteSpace: 'normal' }}
                >
                  {name?.toUpperCase() ?? null}
                </Text>
              </DataRow>
              <Spacer size={15} />
              <DataRow>
                <Text
                  type="bold"
                  color={theme.colors.text.gray}
                  inlineStyle={{ width: '30%' }}
                >
                  Age:
                </Text>
                <Text
                  type="bold"
                  fontWeight="600"
                  inlineStyle={{ width: '70%' }}
                >
                  {age}
                </Text>
              </DataRow>
              <Spacer size={15} />
              <DataRow>
                <Text
                  type="bold"
                  color={theme.colors.text.gray}
                  inlineStyle={{ width: '30%' }}
                >
                  Birth Date:
                </Text>
                <Text
                  type="bold"
                  fontWeight="600"
                  inlineStyle={{ width: '70%' }}
                >
                  {birthday}
                </Text>
              </DataRow>
              <Spacer size={15} />
              <DataRow>
                <Text
                  type="bold"
                  color={theme.colors.text.gray}
                  inlineStyle={{ width: '30%' }}
                >
                  Duty:
                </Text>
                <Text
                  type="bold"
                  fontWeight="600"
                  inlineStyle={{ width: '70%' }}
                >
                  {duty}
                </Text>
              </DataRow>
              <Spacer size={15} />
              <DataRow>
                <Text
                  type="bold"
                  color={theme.colors.text.gray}
                  inlineStyle={{ width: '30%' }}
                >
                  Promo Code:
                </Text>
                <Text
                  type="bold"
                  fontWeight="600"
                  inlineStyle={{ width: '70%' }}
                >
                  {promo_code}
                </Text>
              </DataRow>
              <Spacer size={15} />
              {parents?.length ? (
                <>
                  {parents.map((parent, index) => (
                    <Fragment key={parent.user_id}>
                      <DataRow>
                        <Text
                          type="bold"
                          color={theme.colors.text.gray}
                          inlineStyle={{ width: '30%' }}
                        >
                          {`Parent #${index + 1}`}
                        </Text>
                        <Text
                          type="bold"
                          fontWeight="600"
                          inlineStyle={{ width: '70%' }}
                        >
                          {`${parent.last_name}, ${parent.first_name}`}
                        </Text>
                      </DataRow>
                      <Spacer size={15} />
                      <DataRow
                        style={{
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}
                      >
                        <Text
                          type="bold"
                          color={theme.colors.text.gray}
                          inlineStyle={{ width: '30%' }}
                        >
                          Mobile #
                        </Text>
                        <Text
                          type="bold"
                          color={theme.colors.text.gray}
                          inlineStyle={{ width: '70%' }}
                        >
                          <a
                            href={`tel:${parent.cellphone}`}
                            style={{
                              color: theme.colors.primary,
                              textDecoration: 'none',
                            }}
                          >
                            {formatPhoneNumber(parent.cellphone)}
                          </a>
                        </Text>
                      </DataRow>
                      <Spacer size={15} />
                    </Fragment>
                  ))}
                </>
              ) : null}
              <Spacer size={15} />
              {status === 'refunded' && (
                <div>
                  <DataRow>
                    <Text
                      type="bold"
                      color={theme.colors.primary}
                      textAlign="center"
                      inlineStyle={{ width: '100%' }}
                    >
                      This pass was refunded
                    </Text>
                  </DataRow>
                </div>
              )}
              {status === 'active' && (
                <AllPassesButtons>
                  <Button
                    fontSize={22}
                    onClick={checkInAllPasses}
                    disabled={disableCheckInButton}
                  >
                    Check In All Passes
                  </Button>
                  <Button
                    fontSize={22}
                    onClick={uncheckAllPasses}
                    disabled={disableUnCheckButton}
                  >
                    Uncheck All Passes
                  </Button>
                </AllPassesButtons>
              )}
            </Content>
          </>
        ) : (
          <EventParticipantNoWaiverAdult />
        )}
        <WaiverLinks currentUser={currentUser} />
        <ParticipantPasses
          currentUser={currentUser}
          onChange={(item) => {
            setPurchaseItem(item);
            setUncheck(item.is_checked);
            setShouldDisplayCheckInModal(true);
          }}
        />
      </Content>
    </Container>
  ) : (
    <>
      <Container>
        <TitleContainer>
          <TitleContent>
            <Text type="heading">Participant Details</Text>
            {isOffline && (
              <OfflineWarning>
                Your are offline. Changes will sync when connectivity returns.
              </OfflineWarning>
            )}
            {currentUser && currentUser.parents.length ? (
              <MinorHeaderInfo>
                <Text
                  color="#fa4616"
                  inlineStyle={{
                    fontWeight: 800,
                    fontSize: 28,
                    fontFamily: 'Barlow Condensed',
                  }}
                >
                  MINOR
                </Text>
                <MinorAge>
                  <Text
                    color="#FFF"
                    inlineStyle={{
                      fontWeight: 400,
                      fontFamily: 'Barlow Condensed',
                      fontSize: 20,
                    }}
                  >
                    UNDER
                  </Text>
                  <Text
                    color="#FFF"
                    inlineStyle={{
                      fontWeight: 800,
                      fontFamily: 'Barlow Condensed',
                      fontSize: 20,
                    }}
                  >
                    18
                  </Text>
                </MinorAge>
              </MinorHeaderInfo>
            ) : (
              <span>&nbsp;</span>
            )}
          </TitleContent>
          <IconWrapper>
            <Icon
              icon="close"
              size={18}
              color={'#fa4616'}
              onClick={() => {
                history.goBack();
              }}
            />
          </IconWrapper>
        </TitleContainer>
        <Content>
          <DataRow>
            <Text
              type="bold"
              color={theme.colors.text.gray}
              inlineStyle={{ width: '30%' }}
            >
              Name:
            </Text>
            <Text
              type="bold"
              fontWeight="600"
              inlineStyle={{ width: '70%', whiteSpace: 'normal' }}
            >
              {name?.toUpperCase() ?? null}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text
              type="bold"
              color={theme.colors.text.gray}
              inlineStyle={{ width: '30%' }}
            >
              Age:
            </Text>
            <Text type="bold" fontWeight="600" inlineStyle={{ width: '70%' }}>
              {age}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text
              type="bold"
              color={theme.colors.text.gray}
              inlineStyle={{ width: '30%' }}
            >
              Birth Date:
            </Text>
            <Text type="bold" fontWeight="600" inlineStyle={{ width: '70%' }}>
              {dayjs(birthday).format('MMM DD - YYYY')}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text
              type="bold"
              color={theme.colors.text.gray}
              inlineStyle={{ width: '30%' }}
            >
              Duty:
            </Text>
            <Text type="bold" fontWeight="600" inlineStyle={{ width: '70%' }}>
              {duty}
            </Text>
          </DataRow>
          <Spacer size={15} />
          <DataRow>
            <Text
              type="bold"
              color={theme.colors.text.gray}
              inlineStyle={{ width: '30%' }}
            >
              Promo Code:
            </Text>
            <Text type="bold" fontWeight="600" inlineStyle={{ width: '70%' }}>
              {promo_code}
            </Text>
          </DataRow>
          <Spacer size={15} />
          {parents?.length ? (
            <>
              {parents.map((parent, index) => (
                <Fragment key={parent.user_id}>
                  <DataRow>
                    <Text
                      type="bold"
                      color={theme.colors.text.gray}
                      inlineStyle={{ width: '30%' }}
                    >
                      {`Parent #${index + 1}`}
                    </Text>
                    <Text
                      type="bold"
                      fontWeight="600"
                      inlineStyle={{ width: '70%' }}
                    >
                      {`${parent.last_name}, ${parent.first_name}`}
                    </Text>
                  </DataRow>
                  <Spacer size={15} />
                  <DataRow
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      type="bold"
                      color={theme.colors.text.gray}
                      inlineStyle={{ width: '30%' }}
                    >
                      Mobile #
                    </Text>
                    <Text
                      type="bold"
                      color={theme.colors.text.gray}
                      inlineStyle={{ width: '70%' }}
                    >
                      <a
                        href={`tel:${parent.cellphone}`}
                        style={{
                          color: theme.colors.primary,
                          textDecoration: 'none',
                        }}
                      >
                        {formatPhoneNumber(parent.cellphone)}
                      </a>
                    </Text>
                  </DataRow>
                  <Spacer size={15} />
                </Fragment>
              ))}
            </>
          ) : null}
          <Spacer size={15} />
          {status === 'refunded' && (
            <div>
              <DataRow>
                <Text
                  type="bold"
                  color={theme.colors.primary}
                  textAlign="center"
                  inlineStyle={{ width: '100%' }}
                >
                  This pass was refunded
                </Text>
              </DataRow>
            </div>
          )}
          {status === 'active' && (
            <AllPassesButtons>
              <Button
                fontSize={22}
                onClick={checkInAllPasses}
                disabled={disableCheckInButton}
              >
                Check In All Passes
              </Button>
              <Button
                fontSize={22}
                onClick={uncheckAllPasses}
                disabled={disableUnCheckButton}
              >
                Uncheck All Passes
              </Button>
            </AllPassesButtons>
          )}
        </Content>
        <Content>
          <ParticipantPasses
            currentUser={currentUser}
            onChange={(item) => {
              setPurchaseItem(item);
              setUncheck(item.is_checked);
              setShouldDisplayCheckInModal(true);
            }}
            storedCheckins={storedCheckins}
            storedUnChecks={storedUnChecks}
          />

          {!is_pending && pass_id && (
            <div style={{ marginBottom: 20, textAlign: 'right' }}>
              <WaiverDownloadButton
                passId={pass_id}
                icon={
                  <span
                    className="btn"
                    style={{
                      padding: '10px',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#fa4616',
                    }}
                  >
                    <Icon icon="Waiver-Icon" color={'#fff'} size={34} />
                    <p>Download Waiver </p>
                  </span>
                }
              />
            </div>
          )}
        </Content>
      </Container>
      <CheckInModal
        itemType="pass"
        isVisible={!!shouldDisplayCheckInModal}
        onConfirm={onConfirmCheckIn}
        setIsVisible={setShouldDisplayCheckInModal}
        unCheck={unCheck}
      />
    </>
  );
};

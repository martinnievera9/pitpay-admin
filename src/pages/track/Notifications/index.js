import React, { useState } from 'react';
import styled from 'styled-components';
import {
  CardText,
  Card,
  CardLabel,
  CardContent,
  HideOnMobile,
  HideOnDesktop,
} from 'components/Card/cardStyle';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import ContainerIcon from 'components/ContainerIcon';
import Icon from 'components/Icon';
import LineHeightText from 'components/LineHeightText';
import Loading from 'components/Loading';
import Pagination from 'components/Pagination';
import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from 'components/Table';
import useTheme from 'hooks/useTheme';
import { formatTimestamp } from 'shared/formatters';
import storage from 'shared/storage';
import { Heading } from '../Employees/style';
import EditNotifications from './Edit';
import GetTrackNotifications from './gql/queries/get-track-notifications';
import ViewNotification from './View';

const TitleContainer = styled.div`
  @media (min-width: 860px) {
    display: flex;
    flex-direction: row;
  }
`;

const Notifications = ({ data, location }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const theme = useTheme();

  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page'));

  const handleOutClick = () => setIsVisible(!isVisible);

  const handleViewOutClick = () => {
    setCurrentNotification(null);
    setIsReading(!isReading);
  };

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

  if (data.loading) return <Loading />;

  return (
    <Container>
      <ContainerHeader>
        <TitleContainer>
          <Heading>Messages</Heading>
        </TitleContainer>
        <ContainerIcon onClick={() => setIsVisible(!isVisible)} />
      </ContainerHeader>
      <div style={{ padding: 20 }}>
        <HideOnMobile>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell scope="col">Audience</TableCell>
                <TableCell scope="col">Track/Series</TableCell>
                <TableCell scope="col">Users Targeted</TableCell>
                <TableCell scope="col">Type</TableCell>
                <TableCell scope="col">Date/Time</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.getTrackNotifications
                ? data.getTrackNotifications.results.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <LineHeightText>{getTarget(item)}</LineHeightText>
                      </TableCell>
                      <TableCell>
                        <LineHeightText>
                          {item.track
                            ? item.track
                            : item.series
                            ? item.series
                            : ''}
                        </LineHeightText>
                      </TableCell>
                      <TableCell>
                        <LineHeightText>{item.num_users}</LineHeightText>
                      </TableCell>
                      <TableCell>
                        <LineHeightText>
                          {item.type
                            ? item.type.charAt(0).toUpperCase() +
                              item.type.slice(1)
                            : ''}
                        </LineHeightText>
                      </TableCell>
                      <TableCell>
                        <LineHeightText>
                          {formatTimestamp(
                            item.unixTimestamp,
                            'MMM DD - YYYY h:mm a'
                          )}
                        </LineHeightText>
                      </TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                          }}
                        >
                          <Icon
                            icon="eye"
                            size={22}
                            color={theme.colors.primary}
                            onClick={async () => {
                              setIsReading(!isReading);
                              setCurrentNotification(item);
                            }}
                            padding="0 15px 0 0"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </HideOnMobile>
        <HideOnDesktop>
          {data.getTrackNotifications
            ? data.getTrackNotifications.results.map((item) => (
                <Card key={item.id}>
                  <CardText>
                    <CardLabel style={{ width: '30%' }}>Audience:</CardLabel>{' '}
                    <CardContent style={{ width: '70%' }}>
                      {getTarget(item)}
                    </CardContent>
                  </CardText>
                  <CardText>
                    <CardLabel style={{ width: '30%' }}>
                      Track/Series:
                    </CardLabel>{' '}
                    <CardContent style={{ width: '70%' }}>
                      {item.track ? item.track : item.series ? item.series : ''}
                    </CardContent>
                  </CardText>
                  <CardText>
                    <CardLabel style={{ width: '30%' }}>
                      Users Targeted:
                    </CardLabel>{' '}
                    <CardContent style={{ width: '70%' }}>
                      {item.num_users}
                    </CardContent>
                  </CardText>
                  <CardText>
                    <CardLabel style={{ width: '30%' }}>Type:</CardLabel>{' '}
                    <CardContent style={{ width: '70%' }}>
                      {item.type
                        ? item.type.charAt(0).toUpperCase() + item.type.slice(1)
                        : ''}
                    </CardContent>
                  </CardText>
                  <CardText>
                    <CardLabel style={{ width: '30%' }}>Date/Time:</CardLabel>{' '}
                    <CardContent style={{ width: '70%' }}>
                      {formatTimestamp(
                        item.unixTimestamp,
                        'MMM DD - YYYY h:mm a'
                      )}
                    </CardContent>
                  </CardText>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Icon
                      icon="eye"
                      size={24}
                      color={theme.colors.primary}
                      onClick={async () => {
                        setIsReading(!isReading);
                        setCurrentNotification(item);
                      }}
                    />
                  </div>

                  <div
                    style={{
                      width: '100%',
                      borderBottom: '1px solid #e6e6e6',
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                  ></div>
                </Card>
              ))
            : null}
        </HideOnDesktop>
      </div>

      <Pagination
        count={data.getTrackNotifications.count}
        perPage={15}
        currentPage={currentPage || 1}
      />

      <EditNotifications
        isVisible={isVisible}
        location={location}
        seriesid={
          storage.get('user')
            ? storage.get('user').series
              ? storage.get('user').series.id
              : null
            : null
        }
        trackid={
          storage.get('user')
            ? storage.get('user').track
              ? storage.get('user').track.id
              : null
            : null
        }
        handleOutClick={handleOutClick}
      />

      <ViewNotification
        isVisible={isReading}
        handleOutClick={handleViewOutClick}
        notification={currentNotification}
      />
    </Container>
  );
};

export default GetTrackNotifications(Notifications);

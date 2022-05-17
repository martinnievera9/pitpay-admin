import dayjs from 'dayjs';
import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { LinkButton } from 'components/Button';
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
import Text from 'components/Text';
import { useSearchInput } from 'hooks/useSearchInput';
// import { formatTimestamp } from 'shared/formatters';
import EditNotifications from './Edit';
import GetNotifications from './gql/queries/get-notifications';
import ViewNotification from './View';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ActionsContainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: 860px) {
    width: 300px;
    flex-direction: row;
    justify-content: center;
  }
`;

const ButtonContainer = styled.div`
  display: inline-block;

  @media (min-width: 860px) {
    margin-right: 40px;
    margin-bottom: 0;
    display: block;
  }
`;

const Notifications = ({ data, location, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);
  const adminTrack = location.pathname.indexOf('/admin-track');
  const { input } = useSearchInput();
  const currentPage = input.page ? Number(input.page) : 1;

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
          <Text type="heading" color="#3C4144">
            Messages
          </Text>
        </TitleContainer>
        <ActionsContainer>
          <ButtonContainer>
            <LinkButton to={'/admin/text-lists'}>View Lists</LinkButton>
          </ButtonContainer>
          <ContainerIcon
            onClick={() => setIsVisible(!isVisible)}
            style={{ padding: '0 10px' }}
          />
        </ActionsContainer>
      </ContainerHeader>
      <div style={{ padding: 20 }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col">Audience</TableCell>
              <TableCell scope="col">Track/Series</TableCell>
              <TableCell scope="col">Users Targeted</TableCell>
              <TableCell scope="col">Type</TableCell>
              <TableCell scope="col">Time</TableCell>
              <TableCell scope="col">Author</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.getNotificationsAdmin
              ? data.getNotificationsAdmin.results.map((item) => (
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
                      <div style={{ width: 200 }}>
                        <LineHeightText>
                          {dayjs(item.unixTimestamp).format(
                            'h:mm A MM DD - YYYY'
                          )}
                        </LineHeightText>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div style={{ width: 200 }}>
                        <LineHeightText>
                          {item.user
                            ? `${item.user.last_name}, ${item.user.first_name}`
                            : ''}
                        </LineHeightText>
                      </div>
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
      </div>
      <Pagination
        count={data.getNotificationsAdmin.count}
        perPage={15}
        currentPage={currentPage}
      />

      <EditNotifications
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        adminTrack={adminTrack}
      />

      <ViewNotification
        isVisible={isReading}
        handleOutClick={handleViewOutClick}
        adminTrack={adminTrack}
        notification={currentNotification}
      />
    </Container>
  );
};

export default GetNotifications(withTheme(Notifications));

import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import { LinkButton } from 'components/Button';
import {
  CardText,
  Card,
  HideOnMobile,
  HideOnDesktop,
} from 'components/Card/cardStyle';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import { EventYearFilter, withEventYearFilterContext } from 'components/Events';
import { useGetUserEvents } from 'components/Events/gql';
import { SearchInput } from 'components/Form/SearchInput';
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

const TitleContainer = styled.div`
  @media (min-width: 860px) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const ButtonContainer = styled.div`
  margin-right: 40px;

  @media (min-width: 860px) {
    display: block;
  }
`;

const Page = withEventYearFilterContext(({ theme, history }) => {
  const [search, setSearch] = useState('');

  const { data, loading } = useGetUserEvents();

  const handleChange = (e) => setSearch(e.target.value);

  const handleBlur = (e) => {
    history.push(`/admin-track/guest-lists/?queryString=${e.target.value}`);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      history.push(`/admin-track/guest-lists/?queryString=${e.target.value}`);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page'));

  const events = data?.getUserEvents?.results ?? [];

  const showTracks = events.reduce((acc, event) => {
    if (true === acc) {
      return acc;
    }

    if (false === acc) {
      return event.track.id;
    } else {
      return acc !== event.track.id ? true : event.track.id;
    }
  }, false);

  return (
    <div>
      <Container>
        <ContainerHeader>
          <TitleContainer>
            <Text
              type="heading"
              color="#3C4144"
              inlineStyle={{ marginRight: 25 }}
            >
              Events
            </Text>
            <SearchInput
              placeholder="Search Events"
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyPress}
              value={search}
            />
            <EventYearFilter />
          </TitleContainer>
          <ButtonContainer>
            <LinkButton to={'/admin-track/guests'}>
              View or Add Guests
            </LinkButton>
          </ButtonContainer>
        </ContainerHeader>
        <div style={{ padding: 20 }}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <HideOnMobile>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableCell scope="col">Event</TableCell>
                      {true === showTracks ? (
                        <TableCell scope="col">Track</TableCell>
                      ) : null}
                      <TableCell scope="col">Date</TableCell>
                      <TableCell scope="col">
                        <LineHeightText>Gate Time</LineHeightText>
                      </TableCell>
                      <TableCell scope="col">Status</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Link
                            style={{ color: theme.colors.primary }}
                            to={`/admin-track/guest-lists/event/${item.id}`}
                          >
                            <LineHeightText>{item.name}</LineHeightText>
                          </Link>
                        </TableCell>
                        {true === showTracks ? (
                          <TableCell>
                            <LineHeightText>{item.track.name}</LineHeightText>
                          </TableCell>
                        ) : null}
                        <TableCell>
                          <LineHeightText>
                            {item.isMultiDay
                              ? `${item.month.toUpperCase()} ${
                                  item.listDates
                                } - ${item.year}`
                              : `${item.date} - ${item.year}`}
                          </LineHeightText>
                        </TableCell>
                        <TableCell>
                          <LineHeightText>{item.nextGateTime}</LineHeightText>
                        </TableCell>
                        <TableCell>
                          <LineHeightText>
                            {item.status.toUpperCase()}
                          </LineHeightText>{' '}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </HideOnMobile>
              <HideOnDesktop>
                {events.map((item) => (
                  <Card key={item.id}>
                    <Link
                      style={{
                        color: theme.colors.primary,
                        fontSize: 18,
                        marginBottom: 10,
                        display: 'block',
                        lineHeight: '30px',
                      }}
                      to={`/admin-track/guest-lists/event/${item.id}`}
                    >
                      {item.name}
                    </Link>
                    <CardText>
                      Date:{' '}
                      {item.isMultiDay
                        ? `${item.month} ${item.listDates} - ${item.year}`
                        : `${item.month} ${item.date} - ${item.year}`}
                    </CardText>
                    <CardText>Gate Time: {item.nextGateTime} </CardText>
                  </Card>
                ))}
              </HideOnDesktop>
            </>
          )}
        </div>
        <Pagination
          count={data?.getUserEvents?.count ?? 0}
          perPage={15}
          currentPage={currentPage || 1}
        />
      </Container>
    </div>
  );
});

export default withRouter(withTheme(Page));

import React, { useState } from 'react';
import styled, { withTheme } from 'styled-components';
import { compose } from 'recompose';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import ContainerIcon from 'components/ContainerIcon';
import Icon from 'components/Icon';
import Loading from 'components/Loading';
import Paragraph from 'components/Paragraph';
import { SearchInput } from 'components/Form/SearchInput';
import Text from 'components/Text';
import GetTrackTypes from './gql/queries/get-track-types';
import DeleteTrackType from './gql/mutations/delete-track-type';
import TypeEdit from './TypeEdit';
import Pagination from 'components/Pagination';
import {
  TableComponent as Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeader
} from 'components/Table';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TrackTypes = ({ deleteTrackType, ...props }) => {
  let { data } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [trackType, setEditTrackType] = useState(null);

  const [search, setSearch] = useState('');

  const handleOutClick = () => {
    setIsVisible(!isVisible);
    setEditTrackType(null);
  };

  const handleChange = e => setSearch(e.target.value);
  const handleBlur = e => {
    props.history.push(`/admin/track-types/?queryString=${e.target.value}`);
  };
  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      props.history.push(`/admin/track-types/?queryString=${e.target.value}`);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page'));

  if (props.data.loading) return <Loading />;

  const renderContents = () => {
    if (data.getTrackTypesAdmin.results.length < 1)
      return (
        <Paragraph textAlign="center" lineHeight={100} fontSize={20}>
          No Track Types.
        </Paragraph>
      );

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell scope="col" colSpan={10}>
              Track Type
            </TableCell>
            <TableCell scope="col" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.getTrackTypesAdmin.results.map(item => (
            <TableRow key={item.id}>
              <TableCell colSpan={10}>{item.name}</TableCell>
              <TableCell>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Icon
                    icon="edit"
                    size={18}
                    color={props.theme.colors.primary}
                    onClick={async () => {
                      setEditTrackType(item);
                      setIsVisible(!isVisible);
                    }}
                    padding="0 15px 0 0"
                  />
                  <Icon
                    icon="trash"
                    size={18}
                    color={props.theme.colors.primary}
                    onClick={async () => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this one?'
                        )
                      ) {
                        await deleteTrackType({ id: item.id });
                      } else {
                        return;
                      }
                    }}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Container>
      <ContainerHeader>
        <TitleContainer>
          <Text
            type="heading"
            color="#3C4144"
            inlineStyle={{ marginRight: 25, width: 200 }}
          >
            Track Types
          </Text>
          <SearchInput
            placeholder="Search Track Types"
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            value={search}
          />
        </TitleContainer>
        <ContainerIcon onClick={() => setIsVisible(!isVisible)} />
      </ContainerHeader>
      <div style={{ padding: 20 }}>{renderContents()}</div>

      <Pagination
        count={props.data.getTrackTypesAdmin.count}
        perPage={15}
        currentPage={currentPage || 1}
      />

      <TypeEdit
        isVisible={isVisible}
        handleOutClick={handleOutClick}
        currentTrackType={trackType}
      />
    </Container>
  );
};

export default withTheme(compose(GetTrackTypes, DeleteTrackType)(TrackTypes));

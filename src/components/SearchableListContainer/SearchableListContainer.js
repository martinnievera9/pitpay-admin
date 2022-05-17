import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import Container from 'components/Container';
import ContainerHeader from 'components/ContainerHeader';
import ContainerIcon from 'components/ContainerIcon';
import Pagination from 'components/Pagination';
import { SearchInput } from 'components/Form/SearchInput';
import Text from 'components/Text';
import { useSearchInput, useUpdateQueryString } from 'hooks/useSearchInput';
import useTheme from 'hooks/useTheme';

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 859px) {
    flex-direction: column;
    align-items: flex-start;
    & > h1 {
      margin-bottom: 6px;
    }
  }
`;

export const SearchableListContainer = props => {
  const theme = useTheme();
  const {
    children,
    header,
    itemsPerPage,
    noSearch,
    onAddClick,
    pageCount,
    paginated,
    title,
    titleBarContent,
    searchInputPlaceholder = 'Search'
  } = props;
  const [searchInput, setSearchInput] = useState('');

  const { input } = useSearchInput();
  const currentPage = input.page ? Number(input.page) : 1;
  const updateQueryString = useUpdateQueryString();

  const handleChange = e => setSearchInput(e.target.value);

  const handleBlur = e => {
    updateQueryString(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.keyCode === 13) {
      updateQueryString(e.target.value);
    }
  };

  return (
    <>
      {header && header}
      <Container>
        <ContainerHeader>
          <TitleContainer>
            {typeof title === 'string' ? (
              <Text
                type="heading"
                as="h1"
                color={theme.colors.text.header}
                inlineStyle={{ marginRight: 25, whiteSpace: 'nowrap' }}
              >
                {title}
              </Text>
            ) : (
              title
            )}
            {!noSearch && (
              <SearchInput
                placeholder={searchInputPlaceholder}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyPress}
                value={searchInput}
              />
            )}
            {titleBarContent && titleBarContent}
          </TitleContainer>
          {onAddClick && <ContainerIcon onClick={onAddClick} />}
        </ContainerHeader>
        <div style={{ padding: 20 }}>{children}</div>
        {paginated && (
          <Pagination
            count={pageCount ?? 0}
            perPage={itemsPerPage ?? 15}
            currentPage={currentPage}
          />
        )}
      </Container>
    </>
  );
};
SearchableListContainer.propTypes = {
  header: PropTypes.node,
  itemsPerPage: PropTypes.number,
  noSearch: PropTypes.bool,
  onAddClick: PropTypes.func,
  pageCount: PropTypes.number,
  paginated: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  titleBarContent: PropTypes.node,
  searchInputPlaceholder: PropTypes.string
};

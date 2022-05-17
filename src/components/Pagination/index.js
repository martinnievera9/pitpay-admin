import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'qs';
import { withRouter } from 'react-router';

const PaginationWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 15px;
  box-sizing: border-box;
`;

const PaginationRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  background: #f7f7f7;
  border: 1px solid #cccccc;
  color: #555555;
  border-radius: 3px;
  margin: 0 5px;
  padding: 0;
  font-size: 20px;
  font-family: 'Barlow Condensed';

  &:disabled {
    opacity: 0.45;
  }
`;

const PaginationText = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 0 5px;
  ${(props) => (props.color ? `color: ${props.color}` : '')};
`;

const Button = ({ children, ...props }) => {
  return <ButtonWrapper {...props}>{children}</ButtonWrapper>;
};

const Pagination = ({ count, perPage, currentPage, color, ...props }) => {
  const pages = Math.ceil(count / perPage);

  let { queryString } = qs.parse(window.location.search.substring(1));

  const firstPage = () => {
    const value = 1;

    if (queryString) {
      props.history.push(
        `/${window.location.pathname.substr(
          1
        )}?queryString=${queryString}&page=${value}`
      );
    } else {
      props.history.push(
        `/${window.location.pathname.substr(1)}?page=${value}`
      );
    }
  };

  const nextPage = () => {
    const value = currentPage + 1;

    if (queryString) {
      props.history.push(
        `/${window.location.pathname.substr(
          1
        )}?queryString=${queryString}&page=${value}`
      );
    } else {
      props.history.push(
        `/${window.location.pathname.substr(1)}?page=${value}`
      );
    }
  };

  const prevPage = () => {
    const value = currentPage - 1;

    if (queryString) {
      props.history.push(
        `/${window.location.pathname.substr(
          1
        )}?queryString=${queryString}&page=${value}`
      );
    } else {
      props.history.push(
        `/${window.location.pathname.substr(1)}?page=${value}`
      );
    }
  };

  const lastPage = () => {
    const value = pages;

    if (queryString) {
      props.history.push(
        `/${window.location.pathname.substr(
          1
        )}?queryString=${queryString}&page=${value}`
      );
    } else {
      props.history.push(
        `/${window.location.pathname.substr(1)}?page=${value}`
      );
    }
  };

  return (
    <PaginationWrapper>
      <PaginationRow>
        <PaginationText color={color}>{count} items</PaginationText>

        <Button onClick={firstPage} disabled={currentPage < 2}>
          &laquo;
        </Button>
        <Button onClick={prevPage} disabled={currentPage < 2}>
          &lsaquo;
        </Button>

        <PaginationText color={color}>
          {currentPage} of {pages}
        </PaginationText>

        <Button onClick={nextPage} disabled={currentPage === pages}>
          &rsaquo;
        </Button>
        <Button onClick={lastPage} disabled={currentPage === pages}>
          &raquo;
        </Button>
      </PaginationRow>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number
};

Pagination.defaultProps = {
  currentPage: 1
};

export default withRouter(Pagination);

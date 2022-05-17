import { useCallback } from 'react';
import qs from 'qs';
import { useHistory, useLocation } from 'react-router-dom';

export function useSearchInput() {
  const { search } = useLocation();
  const input = qs.parse(search, { ignoreQueryPrefix: true });
  return { input, queryString: input.queryString };
}

export function useUpdateQuery() {
  const { pathname, search: rawSearch } = useLocation();
  const history = useHistory();
  const search = qs.parse(rawSearch, { ignoreQueryPrefix: true });

  const updateQuery = useCallback(
    queryString => {
      history.push(
        `${pathname}?${qs.stringify({
          ...search,
          ...queryString
        })}`
      );
    },
    [search, history, pathname]
  );
  return updateQuery;
}

export function useUpdateQueryString() {
  const { pathname, search: rawSearch } = useLocation();
  const history = useHistory();
  const search = qs.parse(rawSearch, { ignoreQueryPrefix: true });

  const updateQueryString = useCallback(
    queryString => {
      history.push(
        `${pathname}?${qs.stringify({
          ...search,
          queryString
        })}`
      );
    },
    [search, history, pathname]
  );
  return updateQueryString;
}

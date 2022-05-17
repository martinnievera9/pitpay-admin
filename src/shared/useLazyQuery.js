import { useQuery } from '@apollo/react-hooks';

export const useLazyQuery = query => {
  const { refetch } = useQuery(query, { skip: true });

  const imperativelyCallQuery = variables => {
    return refetch(variables);
  };

  return imperativelyCallQuery;
};

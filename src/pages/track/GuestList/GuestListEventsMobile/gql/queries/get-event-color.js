import { graphql } from '@apollo/react-hoc';
import dayjs from 'dayjs';
import gql from 'graphql-tag';
import qs from 'qs';

export const query = gql`
  query GetEventColor($input: EventColorInput!) {
    getEventColor(input: $input)
  }
`;

export default graphql(query, {
  options: (props) => {
    const { date } = qs.parse(props.location.search, {
      ignoreQueryPrefix: true,
    });

    return {
      variables: {
        input: {
          event_id: parseInt(props.match.params.id),
          date: dayjs(date, 'YYYY-MM-DD').format('MMM DD - YYYY'),
        },
      },
      fetchPolicy: 'cache-and-network',
    };
  },
});

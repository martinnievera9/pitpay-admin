import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import qs from 'qs';
import { EventParticipantRow } from 'components/Participants/gql';

export const query = gql`
  query GetParticipantsList(
    $getParticipantsInput: GetParticipantsList!
    $getEventInput: GetEventInput!
  ) {
    getEvent(input: $getEventInput) {
      id
      isMultiDay
      name
      month
      day
      date
      start_date
      listDates
      end_date
      track {
        id
        logo
      }
      series {
        id
        logo
      }
      status
    }
    getParticipantsList(input: $getParticipantsInput) {
      ...eventParticipantRow
    }
  }
  ${EventParticipantRow}
`;

export default graphql(query, {
  options: props => {
    const { queryString, date } = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    });

    return {
      variables: {
        getParticipantsInput: {
          event_id: Number(props.match.params.id),
          queryString: queryString ? queryString.trim() : '',
          date
        },
        getEventInput: {
          id: parseInt(props.match.params.id)
        }
      },
      fetchPolicy: 'cache-and-network'
    };
  }
});

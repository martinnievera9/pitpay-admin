import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const ME = gql`
  query Me {
    me {
      id
      track {
        id
        name
        logo
        cityAndState
      }
      series {
        id
        name
        logo
        website
        type {
          key
          value
        }
      }
      ownership {
        tracks {
          id
          name
        }
        series {
          id
          name
        }
      }
      first_name
      last_name
      message_center
      registrations
      role
      messageCount
      racerCount
      staffCount
      guestCount
    }
  }
`;

export function useMe() {
  return useQuery(ME);
}

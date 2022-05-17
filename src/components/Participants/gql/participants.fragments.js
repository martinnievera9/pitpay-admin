/* eslint-disable */
import gql from 'graphql-tag';

export const EventParticipantRow = gql`
  fragment eventParticipantRow on Participant {
    id
    status
    name
    has_waiver
    duty
    age
    promo_code
    pass_id
    is_pending
    user_id
    status
    tickets {
      id
      is_checked
      status
      ticket_name
      cost
    }
  }
`;

export const ParticipantDetail = gql`
  fragment participantDetail on Participant {
    ...eventParticipantRow
    birthday
    tickets {
      id
      ticket_name
      is_checked
      cost
      status
    }
    name
    first_name
    last_name
    parents {
      first_name
      last_name
      cellphone
      user_id
    }
    waiver_links {
      type
      link
    }
  }
  ${EventParticipantRow}
`;

export const EventParticipantDownload = gql`
  fragment eventParticipantDownload on Participant {
    id
    status
    name
    has_waiver
    duty
    age
    promo_code
    pass_id
    is_pending
    user_id
    status
    email
    phone
    address
    promo_code
    tickets {
      id
      is_checked
      status
      ticket_name
      cost
    }
  }
`;

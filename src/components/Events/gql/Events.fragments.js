import gql from 'graphql-tag';

export const CommonEventFieldsFragment = gql`
  fragment commonEventFields on Event {
    id
    track_id
    image
    image_id
    logo
    logo_id
    name
    day
    date
    month
    year
    listDates
    start_date
    end_date
    sale_start
    sale_end
    eventDates
    status
    status_color
    series_ids
    color_code
    fullDate
    added_by
    admin_website_url
    admin_schedule_url
    nextStartTime
    isMultiDay
    nextFullDate
    international_fee
    hide_fee
    marketing_fee
    user {
      id
      first_name
      last_name
      middle_name
    }
    track {
      id
      name
    }
    series {
      id
      name
    }
    faqs {
      id
      question
      answer
      order
    }
  }
`;

export const TicketFieldsFragment = gql`
  fragment ticketFields on EventTicket {
    id
    name
    price
    date
    start_date
    end_date
    type
    color_code
    isMultiDay
    gate_time
    start_time
    limit
    form_id
    form {
      id
    }
    description
  }
`;

export const EditTicketFieldsFragment = gql`
  fragment editTicketFields on Event {
    ...commonEventFields
    off_sale_time
    user_id
    registration_sale_start
    registration_sale_end
    registration_off_time
    about
    twitter
    facebook
    instagram
    admin_times {
      id
      event_date
      start_time
      gate_time
    }
    waivers {
      id
      name
    }
    tickets {
      ...ticketFields
    }
    admin_tickets {
      ...ticketFields
    }
    admin_registrations {
      ...ticketFields
    }
    admin_multiday_tickets {
      ...ticketFields
    }
    admin_other_tickets {
      ...ticketFields
    }
    admin_bundle_tickets {
      ...ticketFields
      associated_tickets {
        id
        name
        qty
      }
    }
    registration_email
    other_fees {
      id
      fee_price
      fee_amount
      minimum
      maximum
    }
    registration_fees {
      id
      fee_price
      fee_amount
      minimum
      maximum
    }
    matrix {
      id
      name
    }
  }
  ${CommonEventFieldsFragment}
  ${TicketFieldsFragment}
`;

export const UpcomingEventFieldsFragment = gql`
  fragment upcomingEventFields on Event {
    id
    logo
    fullDate
    nextGateTime
    nextFullDate
    start_date
    next_date
    name
    end_date
    isMultiDay
    listDates
    month
    day
    date
    track {
      id
      logo
      name
      distance
      lat
      lng
    }
    series {
      id
      name
    }
  }
`;

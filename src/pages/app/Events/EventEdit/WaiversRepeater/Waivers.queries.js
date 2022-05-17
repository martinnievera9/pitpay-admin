import gql from 'graphql-tag';

export const WaiverFieldsFragment = gql`
  fragment waiverFields on EventWaiver {
    id
    name
  }
`;

export const GET_WAIVERS_GET_SERIES_DETAIL = gql`
  query GetWaiversData($input: GetSeriesDetailInput!) {
    getWaivers {
      ...waiverFields
    }
    getSeriesDetail(input: $input) {
      id
      user_id
    }
  }
  ${WaiverFieldsFragment}
`;

export const GET_WAIVERS_GET_TRACK = gql`
  query GetWaiversData($input: GetTrackInput!) {
    getWaivers {
      ...waiverFields
    }
    getTrack(input: $input) {
      id
      user_id
      waiver_id
    }
  }
  ${WaiverFieldsFragment}
`;

export const GET_WAIVERS = gql`
  query GetWaiversData {
    getWaivers {
      ...waiverFields
    }
  }
  ${WaiverFieldsFragment}
`;

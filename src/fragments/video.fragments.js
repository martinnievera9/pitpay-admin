import gql from 'graphql-tag';

export const VideoFieldsFragment = gql`
  fragment videoFields on Video {
    id
    title
    url
    image
    runtime
    iframe
    description
    vimeoId
  }
`;

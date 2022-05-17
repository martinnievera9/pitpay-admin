import gql from 'graphql-tag';

export const MatrixFieldsFragment = gql`
  fragment matrixFields on Matrix {
    id
    name
    items {
      id
      ticket_price
      fee
      matrix_id
    }
  }
`;

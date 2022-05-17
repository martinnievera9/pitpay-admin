import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from '../queries/get-employees';

export default graphql(
  gql`
    mutation DeleteEmployee($id: Int!) {
      deleteEmployee(id: $id)
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteEmployee: async (id) => {
        return mutator(() =>
          mutate({
            variables: { id },
            update: (proxy, { data: { deleteEmployee } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true
              });

              if (!deleteEmployee) {
                return;
              }

              const data = proxy.readQuery({
                query,
                variables: { input: search }
              });

              proxy.writeQuery({
                query,
                variables: { input: search },
                data: {
                  ...data,
                  getEmployees: {
                    ...data.getEmployees,
                    count: data.getEmployees.count - 1,
                    results: data.getEmployees.results.filter(
                      (user) => user.id !== id
                    )
                  }
                }
              });
            }
          })
        );
      }
    })
  }
);

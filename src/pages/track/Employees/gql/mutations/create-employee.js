import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import qs from 'qs';
import { query } from '../queries/get-employees';

export default graphql(
  gql`
    mutation CreateEmployee($input: CreateEmployeeInput!) {
      createEmployee(input: $input) {
        id
        cellphone
        email
        first_name
        last_name
        role
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      createEmployee: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { createEmployee } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true,
              });

              const data = proxy.readQuery({
                query,
                variables: { input: search },
              });

              const newEmployee = {
                ...createEmployee,
                middle_name: '',
                suffix: '',
              };
              proxy.writeQuery({
                query,
                variables: { input: search },
                data: {
                  ...data,
                  getEmployees: {
                    ...data.getEmployees,
                    count: data.getEmployees.count + 1,
                    results: data.getEmployees.results.concat(newEmployee),
                  },
                },
              });
            },
          })
        );
      },
    }),
  }
);

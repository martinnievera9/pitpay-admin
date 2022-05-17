import { graphql } from '@apollo/react-hoc';
import gql from 'graphql-tag';
import mutator from 'mutator';
import qs from 'qs';
import { query } from '../queries/get-employees';

export default graphql(
  gql`
    mutation PpdateEmployee($input: UpdateEmployeeInput!) {
      updateEmployee(input: $input) {
        id
        email
        first_name
        last_name
        role
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateEmployee: async (input) => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updateEmployee } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true,
              });

              const data = proxy.readQuery({
                query,
                variables: { input: search },
              });
              const newEmployee = {
                ...updateEmployee,
                middle_name: '',
                suffix: '',
              };
              proxy.writeQuery({
                query,
                variables: { input: search },
                data: {
                  ...data,
                  getUsers: {
                    ...data.getEmployees,
                    count: data.getEmployees.count + 1,
                    results: data.getEmployees.results.reduce((acc, user) => {
                      if (parseInt(user.id) === parseInt(input.id)) {
                        return acc.concat([newEmployee]);
                      }
                      return acc.concat([user]);
                    }, []),
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

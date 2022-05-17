import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from '../queries/get-users';

export default graphql(
  gql`
    mutation Updateuser($input: UpdateUserInput!) {
      updateUser(input: $input) {
        id
        cellphone
        email
        first_name
        middle_name
        last_name
        role
        address
        birthday
        expiration
        inactive
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      updateUser: async input => {
        return mutator(() =>
          mutate({
            variables: { input },
            update: (proxy, { data: { updateUser } }) => {
              const search = qs.parse(window.location.search, {
                ignoreQueryPrefix: true
              });

              const data = proxy.readQuery({
                query,
                variables: { input: search }
              });

              proxy.writeQuery({
                query,
                variables: { input: search },
                data: {
                  ...data,
                  getUsers: {
                    ...data.getUsers,
                    count: data.getUsers.count + 1,
                    results: data.getUsers.results.reduce((acc, user) => {
                      if (parseInt(user.id) === parseInt(input.id)) {
                        return acc.concat([updateUser]);
                      }
                      return acc.concat([user]);
                    }, [])
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

import gql from 'graphql-tag';
import { graphql } from '@apollo/react-hoc';
import qs from 'qs';

import mutator from 'mutator';
import { query } from '../queries/get-users';

export default graphql(
  gql`
    mutation InactivateUser($id: Int!) {
      inactivateUser(id: $id) {
        id
        first_name
        middle_name
        address
        last_name
        email
        role
        cellphone
        suffix
        inactive
        associations
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      inactivateUser: async id => {
        return mutator(() =>
          mutate({
            variables: { id }
            // update: (proxy, { data: { inactivateUser } }) => {
            //   const search = qs.parse(window.location.search, {
            //     ignoreQueryPrefix: true
            //   });

            //   if (!inactivateUser) {
            //     return;
            //   }

            //   const data = proxy.readQuery({
            //     query,
            //     variables: { input: search }
            //   });

            //   proxy.writeQuery({
            //     query,
            //     variables: { input: search },
            //     data: {
            //       ...data,
            //       getUsers: {
            //         ...data.getUsers,
            //         count: data.getUsers.count - 1,
            //         results: data.getUsers.results.filter(
            //           (user) => user.id !== id
            //         )
            //       }
            //     }
            //   });
            // }
          })
        );
      }
    })
  }
);

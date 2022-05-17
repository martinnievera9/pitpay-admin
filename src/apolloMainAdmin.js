import React, { useState, useEffect } from 'react';
import state from 'shared/state';
import storage from 'shared/storage';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-common';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

import yn from 'yn';
export const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink
} = createNetworkStatusNotifier();

const makeClient = async () => {
  const cache = new InMemoryCache();

  //   await persistCache({
  //     cache,
  //     storage: window.localStorage
  //   });

  const authLink = setContext((_, { headers }) => {
    const { jwt } = yn(process.env.debug)
      ? process.env.test_token
      : storage.get('user', {});

    return {
      headers: {
        ...headers,
        authorization: jwt ? `Bearer ${jwt}` : ''
      }
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(message => {
        if (message.code === 404) {
          if (window.location.search !== '?404')
            return (window.location.search = '?404');
        }

        if (message && message.code === 401) {
          storage.clear();
          return (window.location = `/?redirect=${window.location.pathname}`);
        }
        if (!message.field && (message.path || message.message))
          state.send(
            'error',
            message.message ||
              `There was a problem loading \`${message.path[0]}\` `
          );
      });
    if (networkError) console.log(`[Network error]: ${networkError}`);

    if (
      networkError &&
      (networkError.statusCode === 401 || networkError.statusCode === 403)
    ) {
      storage.clear();
      return (window.location = `/?redirect=${window.location.pathname}`);
    }
  });

  return new ApolloClient({
    link: ApolloLink.from([
      errorLink,
      authLink,
      networkStatusNotifierLink,
      createUploadLink({ uri: process.env.REACT_APP_GRAPHQL })
    ]),
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all'
      }
    }
  });
};
export default ({ children, ...props }) => {
  let [client, setClient] = useState();

  useEffect(() => {
    const getClient = async () => {
      let client = await makeClient();
      setClient(client);
    };
    getClient();
  }, []);

  if (!client) return null;
  return (
    <ApolloProvider client={client}>
      {React.cloneElement(children, { ...props })}
    </ApolloProvider>
  );
};

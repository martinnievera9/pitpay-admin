import { split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloProvider } from '@apollo/react-common';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import React, { useState, useEffect } from 'react';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';
import yn from 'yn';
import state from 'shared/state';
import storage from 'shared/storage';
export const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink,
} = createNetworkStatusNotifier();

export const makeClient = async () => {
  const cache = new InMemoryCache();

  const authLink = setContext((_, { headers }) => {
    let jwt = null;
    if (yn(process.env.debug)) {
      jwt = process.env.test_token.jwt;
    } else if (storage.get('promoter-user')) {
      jwt = storage.get('promoter-user').jwt;
    } else if (storage.get('user')) {
      jwt = storage.get('user').jwt;
    }
    return jwt
      ? {
          headers: {
            ...headers,

            authorization: `Bearer ${jwt}`,
          },
        }
      : {
          headers: {
            ...headers,
          },
        };
  });

  const wsLink = new WebSocketLink({
    uri: `${process.env.REACT_APP_GRAPHQL_WS}`,
    options: {
      lazy: true,
      reconnect: true,
      connectionParams: async () => {
        const { jwt } = yn(process.env.debug)
          ? process.env.test_token
          : storage.get('user', {});
        return {
          Authorization: jwt ? `Bearer ${jwt}` : '',
        };
      },
    },
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach((message) => {
        if (message.code === 404) {
          if (window.location.search !== '?404')
            return (window.location.search = '?404');
        }

        if (message && message.code === 401) {
        }
        if (!message.field && (message.path || message.message))
          state.send(
            'error',
            message.message ||
              `There was a problem loading \`${message.path[0]}\` `
          );
      });
    if (networkError) console.warn(`[Network error]: ${networkError}`);

    if (
      networkError &&
      (networkError.statusCode === 401 || networkError.statusCode === 403)
    ) {
      storage.clear();
      return (window.location = `/?redirect=${window.location.pathname}`);
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    ApolloLink.from([
      errorLink,
      authLink,
      networkStatusNotifierLink,
      createUploadLink({ uri: process.env.REACT_APP_GRAPHQL }),
    ])
  );

  return new ApolloClient({
    link: splitLink,
    name: 'dashboard',
    version: '1.0',
    cache,
    defaultOptions: {
      query: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
    },
  });
};
export default ({ children, ...props }) => {
  const [client, setClient] = useState();

  useEffect(() => {
    const getClient = async () => {
      const client = await makeClient();
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

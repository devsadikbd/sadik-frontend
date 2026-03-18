import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { createUploadLink } from 'apollo-upload-client';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';
import PaginationField from './paginationField';

function getGraphqlUri() {
  const isServer = typeof window === 'undefined';
  const serverUri = process.env.API_ENDPOINT || endpoint;
  const clientUri =
    process.env.NEXT_PUBLIC_API_ENDPOINT ||
    (process.env.NODE_ENV === 'production' ? prodEndpoint : endpoint);

  return isServer ? serverUri : clientUri;
}

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) => {
            const isRecoverableMissingCartProduct =
              message.includes("Can't find field") &&
              message.includes('on object false');

            if (isRecoverableMissingCartProduct) return;

            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          });
        if (networkError) {
          const isServerParseError = networkError.name === 'ServerParseError';
          const errorMessage = isServerParseError
            ? `[Network error]: ${networkError}. The configured GraphQL endpoint returned a non-JSON response.`
            : `[Network error]: ${networkError}`;

          console.log(
            errorMessage
          );
        }
      }),
      // this uses apollo-link-http under the hood, so all the options here come from that package
      createUploadLink({
        uri: getGraphqlUri(),
        fetchOptions: {
          credentials: 'include',
        },
        // pass the headers along from this request. This enables SSR with logged in state
        headers,
      }),
    ]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // TODO: We will add this together!
            allProducts: PaginationField(),
          },
        },
      },
    }).restore(initialState || {}),
  });
}

export default withApollo(createClient, { getDataFromTree });

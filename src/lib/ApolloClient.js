import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://many-weevil-33.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "x31xhdnWlQeqtBr8LV0URqnOST2MQY1xryQXPTm2yw2McsimDt4lNnXDkUcYf8nS",
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://many-weevil-33.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "SvTDYXgSmcEWCj5x31dOaVVzYvvS0PiO7EUkiVbFuss4uBk1xu1BCskU6HA15kXn",
      },
    },
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

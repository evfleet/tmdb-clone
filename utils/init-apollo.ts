import { ApolloClient } from "apollo-boost";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-boost";
import fetch from "isomorphic-unfetch";

let apolloClient = null;

if (!process.browser) {
  global.fetch = fetch;
}

function create(initialState) {
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: process.browser,
    link: new HttpLink({
      credentials: "same-origin",
      uri: "http://localhost:3000/graphql"
    }),
    ssrMode: !process.browser
  });
}

export default function initApollo(initialState?) {
  if (!process.browser) {
    return create(initialState);
  }

  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}

import React from "react";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";

import withApolloClient from "../helpers/withApolloClient";

class CustomApp extends App {
  private props: any;

  public render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(CustomApp);

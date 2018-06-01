import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";

import withApolloClient from "../utils/withApolloClient";

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

import * as React from "react";

export default class MoviePage extends React.Component {
  public async getInitialProps({ query }) {
    console.log("query", query);
  }

  public render() {
    return <div>Movies</div>;
  }
}

import gql from "graphql-tag";
import { Query } from "react-apollo";

import Header from "../components/Header";

const TEST_QUERY = gql`
  {
    test
  }
`;

const Index = () => (
  <div>
    <Header />
    <Query query={TEST_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading</div>;
        }

        if (error) {
          return <div>Error! {error.message}</div>;
        }

        return <div>{data.test}</div>;
      }}
    </Query>
    Welcome to the Movies
  </div>
);

export default Index;

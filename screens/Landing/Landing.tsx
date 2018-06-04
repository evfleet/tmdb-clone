import gql from "graphql-tag";
import { Query } from "react-apollo";

import Layout from "../../components/Layout";
import Media from "./components/Media";

const FETCH_HOMEPAGE_CONTENT = gql`
  query fetchHomePageContent {
    getCurrentShows {
      backdrop_path
      id
      name
      next_air_date
      poster_path
    }
    getCurrentMovies {
      id
      title
      backdrop_path
      actors
    }
  }
`;

const Landing = () => (
  <Layout>
    <Query query={FETCH_HOMEPAGE_CONTENT}>
      {({ loading, error, data }) => {
        if (error) {
          return <p>Error</p>;
        }

        if (loading || !data) {
          return <p>Loading</p>;
        }

        return <Media shows={data.getCurrentShows} movies={data.getCurrentMovies} />;
      }}
    </Query>
  </Layout>
);

export default Landing;

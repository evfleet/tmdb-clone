import gql from "graphql-tag";
import { Query } from "react-apollo";

import Layout from "../../components/Layout";
import Media from "./components/Media";

const FETCH_FEATURED_CONTENT = gql`
  query fetchFeaturedContent {
    getFeaturedShows {
      backdrop_path
      id
      name
      next_air_date
      poster_path
    }
    getFeaturedMovies {
      id
      title
      backdrop_path
      actors
    }
  }
`;

const Landing = () => (
  <Layout>
    <Query query={FETCH_FEATURED_CONTENT}>
      {({ loading, error, data }) => {
        if (error) {
          return <p>Error</p>;
        }

        if (loading || !data) {
          return <p>Loading</p>;
        }

        return (
          <Media
            shows={data.getFeaturedShows}
            movies={data.getFeaturedMovies}
          />
        );
      }}
    </Query>
  </Layout>
);

export default Landing;

export default `
  type FeaturedShow {
    id: Int!
    name: String!
    poster_path: String!
    backdrop_path: String!
    next_air_date: String!
  }

  type FeaturedMovie {
    id: Int!
    title: String!
    actors: [String!]!
    backdrop_path: String!
  }

  type Query {
    getFeaturedShows: [FeaturedShow]!
    getFeaturedMovies: [FeaturedMovie]!
  }
`;

export default `

  type CurrentShow {
    id: Int!
    name: String!
    poster_path: String!
    backdrop_path: String!
    next_air_date: String!
  }

  type CurrentMovie {
    id: Int!
    title: String!
    actors: [String!]!
    backdrop_path: String!
  }

  type Query {
    getCurrentShows: [CurrentShow]!
    getCurrentMovies: [CurrentMovie]!
  }
`;

export default `

  type CurrentShow {
    id: Int!
    title: String!
    poster_path: String!
    backdrop_path: String!
    next_air_date: String!
  }


  type Query {
    test: String!
    getCurrentMovies: Int!
    getCurrentShows: [CurrentShow]!
  }
`;

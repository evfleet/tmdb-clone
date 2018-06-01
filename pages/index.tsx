import Header from "../components/Header";
import withApolloClient from "../utils/withApolloClient";

const Index = () => (
  <div>
    <Header />
    Welcome to the Movies
  </div>
);

export default withApolloClient(Index);

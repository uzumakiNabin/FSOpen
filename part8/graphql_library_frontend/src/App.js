import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Main from "./components/Main";

const App = () => {
  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

export default App;

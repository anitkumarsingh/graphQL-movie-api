import { MovieList } from '../components/MovieList';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BASE_URL } from '../constant';
import { AddMovie } from '../components/AddMovie';

const client = new ApolloClient({
	uri: `${BASE_URL}/graphql`,
	cache: new InMemoryCache()
});

const App = () => {
	return (
		<ApolloProvider client={client}>
			<h1>Watch List</h1>
			<MovieList />
			<AddMovie />
		</ApolloProvider>
	);
};

export default App;

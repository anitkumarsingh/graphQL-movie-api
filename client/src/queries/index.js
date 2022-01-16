import { gql } from '@apollo/client';

export const GET_DIRECTOR_QUERY = gql`
	{
		directors {
			name
			id
		}
	}
`;
export const GET_MOVIES_QUERY = gql`
	{
		movies {
			name
			genre
			id
		}
	}
`;

export const ADD_MOVIE_MUTATION = gql`
	mutation ($name: String!, $genre: String!, $directorId: String!) {
		addMovie(name: $name, genre: $genre, directorId: $directorId) {
			name
			id
		}
	}
`;

export const GET_MOVIE_QUERY = gql`
	query ($id: ID) {
		movie(id: $id) {
			name
			genre
			director {
				name
				age
				movies {
					name
					genre
					id
				}
			}
		}
	}
`;

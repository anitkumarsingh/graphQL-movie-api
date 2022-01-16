import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_MOVIE_QUERY } from '../queries';

export const MovieDetails = ({ id }) => {
	const { data, loading } = useQuery(GET_MOVIE_QUERY, {
		variables: {
			id
		}
	});
	if (loading) return <p>Loading...</p>;
	const { name, genre, director } = data.movie;
	const { name: directorName, age, movies } = director;
	return (
		<>
			<h1>Movie Details</h1>
			<p>Name : {name}</p>
			<p>Genre : {genre}</p>
			<h2>Director Details</h2>
			<p>Name : {directorName}</p>
			<p>Age : {age}</p>
			<h3>Movies Directored</h3>
			<ul>
				{movies.map((movie) => {
					return <li key={movie.id}>{movie.name}</li>;
				})}
			</ul>
		</>
	);
};

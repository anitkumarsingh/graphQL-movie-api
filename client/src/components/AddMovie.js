import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DIRECTOR_QUERY } from '../queries';

export const AddMovie = () => {
	const [name, setName] = useState('');
	const [genre, setGenre] = useState('');
	const [directorId, setDirectorId] = useState('');

	const { loading, data, error } = useQuery(GET_DIRECTOR_QUERY);
	const renderDirectors = () => {
		if (loading) return <option disabled>Loading...</option>;
		if (error) return <option disabled>Something went wrong</option>;
		return data.directors.map((d) => {
			return (
				<option key={d.id} value={d.id}>
					{d.name}
				</option>
			);
		});
	};
	const submitHandler = (e) => {
		e.preventDefault();
    console.log(name,genre,directorId)
	};
	return (
		<form id='add-movie' onSubmit={submitHandler}>
			<div>
				<label htmlFor='movie-name'>Movie Name :</label>
				<input
					type='text'
					name='movie-name'
					id='movie-name'
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='genre'>Genre:</label>
				<input
					type='text'
					name='genre'
					id='genre'
					onChange={(e) => setGenre(e.target.value)}
				/>
			</div>
			<div>
				<label htmlFor='director'>Director :</label>
				<select
					name='director'
					id='director'
					onChange={(e) => setDirectorId(e.target.value)}>
					<option>Select a Director</option>
					{renderDirectors()}
				</select>
			</div>
			<div>
				<button type='submit'>Add New Movie</button>
			</div>
		</form>
	);
};

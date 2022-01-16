import React from 'react';
import { gql, rewriteURIForGET, useQuery } from '@apollo/client';

const GET_DIRECTOR_QUERY = gql`
{
  directors{
    name
    id
  }
}
`

export const AddMovie = () => {
  const {loading,data,error} = useQuery(GET_DIRECTOR_QUERY);
  if(loading) return <p>Loading...</p>
  const renderDirectors =()=>{
    if(loading)return <option disabled>Loading...</option>
    if(error) return <option disabled>Something went wrong</option>
    return(
      data.directors.map(d=>{
        return(
         <option key={d.id} value={d.id}>{d.name}</option>
        )
      })
    )
  }
	return (
		<form id='add-movie'>
			<div>
				<label htmlFor='movie-name'>Movie Name :</label>
				<input type='text' name='movie-name' id='movie-name' />
			</div>
			<div>
				<label htmlFor='genre'>Genre:</label>
				<input type='text' name='genre' id='genre' />
			</div>
			<div>
				<label htmlFor='director'>Director :</label>
        <select  name='director' id='director' >
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

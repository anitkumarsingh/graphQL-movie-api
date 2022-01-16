import React from 'react';
import {gql,useQuery} from '@apollo/client';

const GET_MOVIES_QUERY = gql`
{
  movies{
    name
    genre
    id
  }
}
`
export const MovieList = () => {
const {loading,data} = useQuery(GET_MOVIES_QUERY);
if(loading) return <p>Loading...</p>
console.log(data)
const renderMovies = ()=> {
  return(
    data.movies.map(m=>{
      return(
        <li key={m.id}>{m.name}</li>
      )
    })
  )
}
  return (
    <div>
      <ul>
        {renderMovies()}
      </ul>
    </div>
  )
}

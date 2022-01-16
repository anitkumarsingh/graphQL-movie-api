import React from 'react';
import {useQuery} from '@apollo/client';
import { GET_MOVIES_QUERY } from '../queries';

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

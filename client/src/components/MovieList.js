import React,{useState} from 'react';
import {useQuery} from '@apollo/client';
import { GET_MOVIES_QUERY } from '../queries';
import { MovieDetails } from './MovieDetails';

export const MovieList = () => {
const [clickedMovieId, setClickedMovieId] = useState(null);
const {loading,data} = useQuery(GET_MOVIES_QUERY);
if(loading) return <p>Loading...</p>

console.log(data);
const renderMovies = ()=> {
  return(
    data.movies.map(m=>{
      return(
        <li key={m.id} onClick={(e)=>setClickedMovieId(m.id)}>{m.name}</li>
      )
    })
  )
}
  return (
    <>
      <ul>
        {renderMovies()}
      </ul>
      {clickedMovieId ? (<MovieDetails id={clickedMovieId}/>):null}
    </>
  )
}

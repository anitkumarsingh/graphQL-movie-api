import React from 'react';
import {gql,useQuery} from '@apollo/client';

const MOVIES_QUERY = gql`
{
  movies{
    name
    genre
    id
  }
}
`
export const MovieList = () => {
const {loading,error,data} = useQuery(MOVIES_QUERY);
if(loading) return <p>Loading...</p>
console.log(data)
  return (
    <div>
      <ul>
        <li>Movie List</li>
      </ul>
    </div>
  )
}

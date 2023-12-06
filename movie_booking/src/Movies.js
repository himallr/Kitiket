import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getMovies } from './Api-helper';
import Movieitems from './Movieitems';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies()
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((e) => console.log("error"));
  }, []);

  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      <Box width={"auto"} padding={5}>
        <Typography variant="h4" textAlign={"center"}>All Movies</Typography>
      </Box>
      <Box display={"flex"} justifyContent={"center"} margin={"auto"} width={"100%"} flexWrap={"wrap"}>
        {
          movies.slice().map((e, index) =>
            <Movieitems id={e._id} key={index} title={e.title} description={e.description} releaseDate={e.releaseDate} posterURL={e.posterURL} />
          )
        }
      </Box>
    </Box>
  )
}

export default Movies

import { Box, Button, Typography, colors } from "@mui/material";
import React, { useEffect, useState } from "react";
import main from "./images/main.jpg";
import Movieitems from "./Movieitems";
import { getMovies } from "./Api-helper";
import { Link } from "react-router-dom";

function Main() {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        getMovies()
            .then((data) => {
                setMovies(data.movies);
            })
            .catch((e) => console.log("error"));
    },[]);
    return (
        <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
            <Box width={"80%"} height={"20%"}>
                <img src={main} alt="img" width={1510}></img>
            </Box>
            <Box width={"auto"} padding={5}>
                <Typography variant="h4" textAlign={"center"}>New Movies</Typography>
            </Box>

            <Box display={"flex"} justifyContent={"center"} margin={"auto"} width={"80%"} flexWrap={"wrap"}>
                {
                    movies.slice(0,5).map((e, index) =>
                        <Movieitems id={e._id} key={index} title={e.title} description={e.description} releaseDate={e.releaseDate} posterURL={e.posterURL} />
                    )
                }
            </Box>
            <Box width={"auto"} padding={5} justifyContent={"center"} marginLeft={"43%"}>
                <Button LinkComponent={Link} to="/movies" variant="contained" sx={{ bgcolor: "#184e77" }}>More Movies</Button>
            </Box>
        </Box>
    );
}

export default Main;
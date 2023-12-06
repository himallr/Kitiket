import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addBookings, getMovieDetails } from './Api-helper';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const Bookings = () => {
    const [movie, setMovie] = useState();
    const [inputs, setInputs] = useState({ seatNumber: "", date: "" });
    const id = useParams().id;
    console.log(id);
    useEffect(() => {
        getMovieDetails(id).then((res) => {
            setMovie(res.movies);
        })
            .catch((e) => console.log(e));
    }, [id])
    const handleChange = (e) => {
        setInputs((prevstate) => ({ ...prevstate, [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        addBookings({ ...inputs, movie: movie._id })
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    }
    console.log(movie);
    return (
        <div>
            {
                movie &&
                <div>
                    <Typography padding={3} fontFamily={'fantasy'} textAlign={"center"} variant={"h4"}>
                        Book Tickets of Movie : {movie.title}
                    </Typography>
                    <Box display={"flex"} flexDirection={"row"} width={"100%"}>
                        <Box display={"flex"} justifyContent={"center"} paddingLeft={2}>
                            <Box display={"flex"} justifyContent={"column"} flexDirection="column" paddingTop={3} width="100%" marginRight={"auto"}>
                                <img
                                    width="80%"
                                    height={"300px"}
                                    src={movie.posterURL}
                                    alt={movie.title}
                                />
                                <Box width={"80%"} marginTop={3} padding={2}>

                                    <Typography paddingTop={2}>{movie.hours},{movie.description}</Typography>
                                    <Typography fontWeight={"bold"} marginTop={1}>
                                        Actors:
                                        {movie.actors.map((actor) => " " + actor + ", ")}
                                    </Typography>
                                    <Typography fontWeight={"bold"} marginTop={1}>
                                        Release Date: </Typography>
                                    <Typography>{new Date(movie.releaseDate).toDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box width={"50%"} paddingTop={3}>
                            <form onSubmit={handleSubmit}>
                                <Box
                                    padding={5}
                                    margin={"auto"}
                                    display="flex"
                                    flexDirection={"column"}
                                >
                                    <FormLabel>Seat Number</FormLabel>
                                    <TextField
                                        name="seatNumber"
                                        type={"number"}
                                        margin="normal"
                                        variant="standard"
                                        value={inputs.seatNumber}
                                        onChange={handleChange}
                                    />
                                    <FormLabel>Booking Date</FormLabel>
                                    <TextField
                                        name="date"
                                        type={"date"}
                                        margin="normal"
                                        variant="standard"
                                        value={inputs.date}
                                        onChange={handleChange}
                                    />
                                    <Button type="submit" sx={{ mt: 3 }}>
                                        Book Now
                                    </Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </div>
            }
        </div>
    )
}

export default Bookings

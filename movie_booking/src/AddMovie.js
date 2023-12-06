import { Box, Button, Checkbox, FormLabel, TextField, Typography, } from "@mui/material";
import React, { useState } from "react";
import { addMovie } from "./Api-helper";
const labelProps = {
    mt: 1,
    mb: 1,
};
const AddMovie = () => {
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        posterURL: "",
        releaseDate: "",
        rating: "",
        hours: "",
        featured: false,
    });
    const [actors, setActors] = useState([]);
    const [actor, setActor] = useState("");
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs, actors);
        addMovie({ ...inputs, actors })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    width={"50%"}
                    padding={10}
                    margin="auto"
                    display={"flex"}
                    flexDirection="column"
                    boxShadow={"10px 10px 20px #ccc"}
                >
                    <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
                        Add New Movie
                    </Typography>
                    <FormLabel sx={labelProps}>Title</FormLabel>
                    <TextField
                        value={inputs.title}
                        onChange={handleChange}
                        name="title"
                        variant="standard"
                        margin="normal"
                    />
                    <FormLabel sx={labelProps}>Description</FormLabel>
                    <TextField
                        value={inputs.description}
                        onChange={handleChange}
                        name="description"
                        variant="standard"
                        margin="normal"
                    />
                    <FormLabel sx={labelProps}>Poster URL</FormLabel>
                    <TextField
                        value={inputs.posterURL}
                        onChange={handleChange}
                        name="posterURL"
                        variant="standard"
                        margin="normal"
                    />
                    <FormLabel sx={labelProps}>Rating</FormLabel>
                    <TextField
                        value={inputs.rating}
                        onChange={handleChange}
                        name="rating"
                        variant="standard"
                        margin="normal"
                    />
                    <FormLabel sx={labelProps}>Total Hours</FormLabel>
                    <TextField
                        value={inputs.hours}
                        onChange={handleChange}
                        name="hours"
                        variant="standard"
                        margin="normal"
                    />
                    <FormLabel sx={labelProps}>Release Date</FormLabel>
                    <TextField
                        value={inputs.releaseDate}
                        onChange={handleChange}
                        type={"date"}
                        name="releaseDate"
                        variant="standard"
                        margin="normal"
                    />
                    <FormLabel sx={labelProps}>Actor</FormLabel>
                    <Box display={"flex"}>
                        <TextField
                            value={inputs.actor}
                            onChange={(e) => setActor(e.target.value)}
                            variant="standard"
                            margin="normal"
                        />
                        <Button onClick={() => { setActors([...actors, actor]);}}
                        >
                            Add
                        </Button>
                    </Box>
                    <FormLabel sx={labelProps}>Featured</FormLabel>
                    <Checkbox
                        name="fetaured"
                        sx={{ mr: 'auto' }}
                        checked={inputs.featured}
                        onClick={(e) =>
                            setInputs((prevSate) => ({
                                ...prevSate,
                                featured: e.target.checked,
                            }))
                        }
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: "30%",
                            margin: "auto",
                            bgcolor: "#2b2d42",
                            ":hover": {
                                bgcolor: "#121217",
                            },
                        }}
                    >
                        Add New Movie
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default AddMovie;
import React, { useEffect, useState } from "react";
import { AppBar, Autocomplete, Box, Tab, Tabs, TextField, Toolbar, colors } from "@mui/material";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { getMovies } from "./Api-helper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "./store";

function Header() {
    const dispatch = useDispatch();
    const [value, setValue] = useState(0);
    const [movies, setMovies] = useState([]);
    const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
    const [selectedMovie, setSelectedMovie] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        getMovies()
            .then((data) => {
                setMovies(data.movies)
            })
            .catch((e) => console.log("error"));
    })

    const handlechange = (e, val) => {
        setSelectedMovie(val);
        const movie = movies.find((m) => m.title === val);
        console.log(movie);
        if(isUserLoggedIn){
            navigate(`/booking/${movie._id}`)
        }
    }
    const logout = (isUser) => {
        dispatch(isUser ? userActions.logout() : adminActions.logout())
    }

    const handleSignIn = () => {
        const text = "User LogIn"
        const value = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(value);
    }

    const handleAdminSignIn = () => {
        const text = "Admin LogIn"
        const value = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(value);
    }

    const handleHome = () => {
        const text = "Welcome to Kiticket"
        const value = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(value);
    }

    const handleMovie = () => {
        const text = "All movies"
        const value = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(value);
    }

    return (
        <AppBar sx={{ bgcolor: "#184e77" }}>
            <Toolbar>
                <Box width={"20%"}>
                    <Link onClick={handleHome} to="/" style={{ textDecoration: "none", color: "white" }}>
                        <MovieFilterIcon />
                    </Link>
                </Box>
                <Box width={"80%"} margin={"auto"}>
                    <Autocomplete
                        onChange={handlechange}
                        freeSolo
                        options={movies && movies.map((e) => e.title)}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField sx={{ input: { color: "white" } }} variant="standard" {...params} placeholder="Search for Movies..." />} />
                </Box>
                <Box>
                    <Box display={"flex"}>
                        <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e, val) => {
                            setValue(val)
                        }}>
                            <Tab LinkComponent={Link} to="/movies" label="Movies" onClick={handleMovie} />
                            {!isUserLoggedIn && !isAdminLoggedIn &&
                                <div>
                                    <Tab LinkComponent={Link} onClick={handleSignIn} to="/auth" label="Login" />
                                    <Tab LinkComponent={Link} onClick={handleAdminSignIn} to="/admin" label="Admin" />
                                </div>}
                            {isUserLoggedIn &&
                                <div>
                                    <Tab LinkComponent={Link} to="/profileuser" label="Profile" />
                                    <Tab LinkComponent={Link} onClick={() => logout(true)} to="/" label="Logout" />
                                </div>}
                            {isAdminLoggedIn &&
                                <div>
                                    <Tab LinkComponent={Link} to="/addmovie" label="Add Movie" />
                                    <Tab LinkComponent={Link} to="/profileadmin" label="Profile" />
                                    <Tab LinkComponent={Link} onClick={() => logout(false)} to="/" label="Logout" />
                                </div>}
                        </Tabs>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { DeleteForeverOutlined } from "@mui/icons-material/";
import { useNavigate } from "react-router-dom";
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { deleteBooking, getMovies, getUserBooking, getUserbyId } from "./Api-helper";
const Profileuser = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [bookings, setBookings] = useState([]);
    const onResReceived = (res) => {
        console.log(res.bookings);
        setBookings(res.bookings);
    };
    useEffect(() => {
        getUserBooking()
            .then(onResReceived)
            .catch((err) => console.log(err));

        getUserbyId()
            .then((res) => { setUser(res.users); console.log(res.users.email); })
            .catch((e) => console.log(e))

    }, []);
    const handleDelete = (id) => {
        deleteBooking(id)
            .then(() => navigate("/"))
            .catch((err) => console.log(err));
    };

    return (
        <Box width="100%" display={"flex"}>
            {bookings && bookings.length > 0 && <Box
                display="flex"
                flexDirection={"column"}
                justifyContent="center"
                alignItems={"center"}
                width="30%"
            >
                <PersonRoundedIcon sx={{ fontSize: "20rem" }} />
                <Typography
                    padding={1}
                    width="100px"
                    textAlign={"center"}
                    border="1px solid #ccc"
                    borderRadius={10}
                >
                    Name: {bookings.length >= 0 && user.name}
                </Typography>
                <Typography
                    padding={1}
                    width="200px"
                    textAlign={"center"}
                    border="1px solid #ccc"
                    borderRadius={10}
                >
                    Email: {bookings.length >= 0 && user.email}
                </Typography>
            </Box>}
            <Box width="70%" display="flex" flexDirection={"column"}>
                <Typography
                    variant="h3"
                    fontFamily={"verdana"}
                    textAlign="center"
                    padding={2}
                >
                    Bookings
                </Typography>

                <Box margin="auto" display="flex" flexDirection={"column"} width="80%">
                    <List>
                        {bookings &&
                            bookings.map((booking, index) => (
                                <ListItem
                                    sx={{
                                        bgcolor: "#00d386",
                                        color: "white",
                                        textAlign: "center",
                                        margin: 1,
                                    }}
                                    key={index}
                                >
                                    <ListItemText
                                        sx={{ margin: 1, width: "100px", textAlign: "left" }}
                                    >
                                        Movie: {booking.movie.name}
                                    </ListItemText>
                                    <ListItemText
                                        sx={{ margin: 1, width: "100px", textAlign: "left" }}
                                    >
                                        Seat: {booking.seatNumber}
                                    </ListItemText>
                                    <ListItemText
                                        sx={{ margin: 1, width: "100px", textAlign: "left" }}
                                    >
                                        Date: {new Date(booking.date).toDateString()}
                                    </ListItemText>
                                    <IconButton
                                        onClick={() => handleDelete(booking._id)}
                                        color="error"
                                    >
                                        <DeleteForeverOutlined />
                                    </IconButton>
                                </ListItem>
                            ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default Profileuser;
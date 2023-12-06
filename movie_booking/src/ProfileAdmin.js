import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import { deleteMovie, getAdminById } from "./Api-helper";
import { useNavigate } from "react-router-dom";
import { DeleteForeverOutlined } from "@mui/icons-material";
const ProfileAdmin = () => {
  const [admin, setAdmin] = useState();
  const navigate = useNavigate();
  const onResReceived = (res) => {
    setAdmin(res.admin);
  };
  useEffect(() => {
    getAdminById()
      .then(onResReceived)
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteMovie(id)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  console.log(admin);
  return (
    <Box width="100%" display={"flex"}>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyContent="center"
        alignItems={"center"}
        width="30%"
      >
        <PersonRoundedIcon sx={{ fontSize: "20rem" }} />
        <Typography
          padding={1}
          width="300px"
          textAlign={"center"}
          border="1px solid #ccc"
          borderRadius={10}
        >
          Name: {admin && admin.name}
        </Typography>
        <br></br>
        <Typography
          padding={1}
          width="300px"
          textAlign={"center"}
          border="1px solid #ccc"
          borderRadius={10}
        >
          Email: {admin && admin.email}
        </Typography>
      </Box>
      <Box width="70%" display="flex" flexDirection={"column"}>
        <Typography
          variant="h3"
          fontFamily={"verdana"}
          textAlign="center"
          padding={2}
        >
          Added Movies
        </Typography>

        <Box margin="auto" display="flex" flexDirection={"column"} width="80%">
          <List>
            {admin &&
              admin.addedmovies.map((movie, index) => (
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
                    Movie: {movie.title}
                  </ListItemText>
                  <ListItemText
                    sx={{ margin: 1, width: "100px", textAlign: "left" }}
                  >
                    Releasing: {new Date(movie.releaseDate).toDateString()}
                  </ListItemText>
                  <IconButton
                    onClick={() => handleDelete(movie._id)}
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

export default ProfileAdmin;
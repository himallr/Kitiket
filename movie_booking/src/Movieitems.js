import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react';
import { Link } from 'react-router-dom';

const Movieitems = ({ title, releaseDate, posterURL, description, id }) => {
    return (
        <Card sx={{ minWidth: 300, height: "100%", margin: 4, borderRadius: 5, ":hover": { boxShadow: "10px 10px 10px #ccc" } }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} textAlign={"center"} color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <CardMedia
                    sx={{ height: 140 }}
                    image={posterURL}
                    title={title}
                />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {new Date(releaseDate).toDateString}
                </Typography>
                <Typography variant="body2">
                    {description}
                    <br />
                </Typography>
            </CardContent>
            <Box justifyContent={"center"} width={"100%"} marginLeft={"40%"} paddingBottom={4} alignItems={"center"}>
                <Button LinkComponent={Link} to={`/booking/${id}`} sx={{ mt: "2", bgcolor: "#184e77" }} variant="contained">Book</Button>
            </Box>
        </Card>
    )
}

export default Movieitems

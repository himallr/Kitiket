import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = ({ onSubmit,isAdmin }) => {
  const [signup, setSignup] = useState(false);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevstate) => ({
      ...prevstate, [e.target.name]: e.target.value,
    }));

  }

  const handleSubmit = (e) => {
    e.preventDefault(); //it doesn't lose data when refreshes page
    console.log(inputs);
    onSubmit({ inputs, signup: isAdmin ? false : signup });
  }
  return (
    <Box height={"100%"} paddingTop={2} justifyContent={"center"} width={"40%"} border={1} borderRadius={10} alignContent={"center"} marginLeft={"30%"} >

      <Box justifyContent={"center"} width={"100%"} paddingTop={4} alignItems={"center"}>
        <Typography variant='h4' textAlign={"center"}>{signup ? "Signup" : "Login"} Page</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} justifyContent={"center"} margin={"auto"} width={"70%"} flexDirection={"column"} padding={5} flexWrap={"wrap"}>
          {!isAdmin && signup && (<> <TextField value={inputs.name} onChange={handleChange} name='name' sx={{ padding: 1 }} type='text' id="standard-basic" placeholder="Enter Name" variant="outlined" /> </>)}
          <TextField value={inputs.email} onChange={handleChange} name='email' sx={{ padding: 1 }} type='email' id="standard-basic" placeholder="Enter Email" variant="outlined" />
          <TextField value={inputs.password} onChange={handleChange} name='password' sx={{ padding: 1 }} type='password' id="standard-basic" placeholder="Enter Password" variant="outlined" />
          <button style={{ backgroundColor: "#184e77", color: "white", fontWeight: "bold", padding: "10px", border: "0", borderRadius: "5px" }} onSubmit={() => { console.log("hello"); }}>
            {
              signup ? "SIGNUP" : "LOGIN"
            }
          </button>
          {!isAdmin && <Typography>{!signup ? "Create an account?" : "Already have an account?"}<Link onClick={() => {
            setSignup(!signup)
          }} to="">{signup ? "Login" : "Signup"}</Link></Typography>}
        </Box>
      </form>
    </Box>
  )
}

export default Login

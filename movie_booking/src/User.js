import React from 'react'
import Login from './Login'
import { sendUsers } from './Api-helper'
import { useDispatch } from 'react-redux'
import { userActions } from './store'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resrecieve = (data)=>{
    console.log(data);
    dispatch(userActions.login())
    localStorage.setItem("userId",data.id);
    navigate("/");
  }
  const getData = (datas) => {
    sendUsers(datas.inputs, datas.signup)
    .then(resrecieve)
    .catch((e) => {
      console.log(e);
    })
  }
  return (
    <div>
      <Login onSubmit={getData} isAdmin={false} />
    </div>
  )
}

export default Auth

import React from 'react'
import Login from './Login'
import { adminreq } from './Api-helper'
import { adminActions } from './store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resrecieve = (data) => {
    console.log(data.id);
    dispatch(adminActions.login())
    localStorage.setItem("adminID", data.id);
    localStorage.setItem("Token", data.token);
    navigate("/");
  }
  const getData = (datas) => {
    console.log("Admin", datas);
    adminreq(datas.inputs).then(resrecieve)
      .catch((e) => console.log(e))
  }
  return (
    <div>
      <Login onSubmit={getData} isAdmin={true} />
    </div>
  )
}

export default Admin;
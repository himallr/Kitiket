import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import Movies from "./Movies";
import Admin from "./Admin";
import Auth from "./User";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "./store";
import Bookings from "./Bookings";
import Profileuser from "./Profileuser";
import AddMovie from "./AddMovie";
import ProfileAdmin from "./ProfileAdmin";


function App() {

  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);

  console.log("isUserLoggedIn : " + isUserLoggedIn);
  console.log("isAdminLoggedIn : " + isAdminLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    }
    else if (localStorage.getItem("adminID")) {
      dispatch(adminActions.login());
    }
  }, [dispatch])
  return (
    <div>
      <Header />
      <div style={{ marginTop: 100 }}>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          {isUserLoggedIn && !isAdminLoggedIn && <>
            <Route path="/booking/:id" element={<Bookings />}></Route>
            <Route path="/profileuser" element={<Profileuser />}></Route>
          </>}
          {<>
            <Route path="/profileadmin" element={<ProfileAdmin />}></Route>
            <Route path="/addmovie" element={<AddMovie />}></Route>
          </>}
        </Routes>
      </div>
    </div>
  );
}

export default App;

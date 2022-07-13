import Users from "./Component/Users";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import { useContext, useEffect, useState } from "react";
import ContextApi from "./Context/ContextApi";
import Profile from "./profile/Profile";
import Home from "./Component/Home";
import ProfileSetup from "./profile/ProfileSetup";
import axios from "axios";
import myInitObject from "./ApiUrl/url";
import RequiredAuth from './Context/RequireAuth'

function App() {
  const [user, setUser] = useState({ isAuth: false, id: null, email: null });
  let nav = useNavigate();
  let loc=useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      
      let token = JSON.parse(localStorage.getItem("TOKEN"));
      if(token== null  ) return
      if (token != null) {
        // setUser({ ...user, isAuth: true });
        try {
          let res = await axios.get(myInitObject.homeURL + "/myprofile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            let {id,email}=await res.data;
            console.log(await res.data)
            setUser({id:id, email:email, isAuth: true });
          }
        } catch (error) {
          console.log(error.response);
          alert("Session is expire please login again");
          nav("/login");
          return;
        }
      } 
    };
    checkAuth();
  }, []);

  const authHandler = (isAuth, id, email) => {
    setUser({ isAuth: isAuth, id: id, email: email });
    console.log(isAuth ,id, email);
   return;
  };

  return (
    <>
      <ContextApi.Provider
        value={{ isAuth: user.isAuth, id: user.id, email: user.email }}
      >
        <Navbar authHandler={authHandler} />
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/login"
            element={<LoginForm authHandler={authHandler} />}
          />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/myprofile/:id" element={<RequiredAuth><Profile /></RequiredAuth> } />
          <Route path="/myprofile" element={<RequiredAuth><Profile /></RequiredAuth> } />
          <Route path="/editprofile" element={<RequiredAuth><ProfileSetup /></RequiredAuth>} />
          <Route path="/*" element ={<>404</>}/>
        </Routes>
      </ContextApi.Provider>
    </>

    // <div className="text-3xl font-bold underline">hi</div>
  );
}

export default App;

import Users from "./Component/Users";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Component/Navbar";
import { useEffect, useState, Suspense, lazy } from "react";
import ContextApi from "./Context/ContextApi";
import axios from "axios";
import myInitObject from "./ApiUrl/url";
import RequiredAuth from "./Context/RequireAuth";

const Profile = lazy(() => import("./profile/Profile"));

const Home = lazy(() => import("./Component/Home"));

const ProfileSetup = lazy(() => import("./profile/ProfileSetup"));


const PageNotFound = lazy(() => import("./Component/PageNotFound"));

function App() {
  const [user, setUser] = useState({ isAuth: false, id: null, email: null });
  let nav = useNavigate();
  let loc = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      let token = JSON.parse(localStorage.getItem("TOKEN"));
      if (token == null) return;
      if (token != null) {
        // setUser({ ...user, isAuth: true });
        try {
          let res = await axios.get(myInitObject.homeURL + "/myprofile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            let { id, email } = await res.data;
            setUser({ id: id, email: email, isAuth: true });
          }
        } catch (error) {
          alert("Session is expire please login again");
          localStorage.removeItem("TOKEN");
          nav("/login");
          return;
        }
      }
    };
    checkAuth();
  }, []);

  const authHandler = (isAuth, id, email) => {
    setUser({ isAuth: isAuth, id: id, email: email });
    return;
  };

  return (
    <>
      <ContextApi.Provider
        value={{ isAuth: user.isAuth, id: user.id, email: user.email }}
      >
        <Navbar authHandler={authHandler} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/login"
              element={<LoginForm authHandler={authHandler} />}
            />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profile/:id" element={<Profile authHandler={authHandler} />} />
            <Route
              path="/myprofile"
              element={
                <RequiredAuth>
                  <Profile authHandler={authHandler} />
                </RequiredAuth>
              }
            />
            <Route
              path="/editprofile"
              element={
                <RequiredAuth>
                  <ProfileSetup />
                </RequiredAuth>
              }
            />

            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </ContextApi.Provider>
    </>

    // <div className="text-3xl font-bold underline">hi</div>
  );
}

export default App;

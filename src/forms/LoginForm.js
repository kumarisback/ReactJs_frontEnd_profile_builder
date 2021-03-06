import axios from "axios";
import React, { useRef, useState, useContext, useEffect } from "react";
import myInitObject from "../ApiUrl/url";
import ContextApi from "../Context/ContextApi";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {
  let navigate = useNavigate();
  const userName = useRef();
  const passWord = useRef();
  const [loginStatus, setLoginStatus] = useState(false);
  const userDetails = useContext(ContextApi);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      userName.current.value.trim().length === 0 ||
      passWord.current.value.trim().length === null
    ) {
      alert("Please fill email/password");
      return;
    }

    try {
      const token = Buffer.from(
        `${userName.current.value}:${passWord.current.value}`,
        "utf8"
      ).toString("base64");
      // console.log(token);
      const res = await axios.post(myInitObject.homeURL + "/token", null, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      if (res.status === 200) {
        let data = await res.data;
        localStorage.setItem("TOKEN", JSON.stringify(data.token));
        navigate(`/myprofile`);
        props.authHandler(true, data.ID, data.username);
        return;
      }
    } catch (error) {
      setLoginStatus(true);
      alert("Wrong Credentials");
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => setLoginStatus(false), 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [loginStatus]);

  return (
    <div>
      {loginStatus && (
        <div role="alert">
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>Username or password is wrong</p>
          </div>
        </div>
      )}
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={(e) => submitHandler(e)}>
                <div className="mb-6">
                  <input
                    type="email"
                    id="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    ref={userName}
                    required
                  />
                </div>

                <div className="mb-6">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    ref={passWord}
                    pattern=".{6,}"
                    required
                    title="6 characters minimum"
                  />
                </div>

                {/* <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
              />
              <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                >Remember me</label
              >
            </div>
         `    <a href="#!" className="text-gray-800">Forgot password?</a>` 
          </div> */}

                <div className="text-center lg:text-left">
                  <button
                    onClick={submitHandler}
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <a
                      onClick={() => {
                        navigate("/register");
                      }}
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;

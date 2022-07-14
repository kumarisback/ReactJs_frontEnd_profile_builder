import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myInitObject from "../ApiUrl/url";

const RegisterForm = () => {
  // const [loginStatus, setLoginStatus] = useState(false);
  const [fail, setfail] = useState(false);
  const [clicked, setClicked] = useState(false)
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const phoneNo = useRef(null);
  let navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (
        !name.current.value ||
        !email.current.value ||
        !password.current.value ||
        !phoneNo.current.value
      ) {
        alert("Enter your data");
        return;
      }
      let formData = new FormData();
      formData.append("name", name.current.value);
      formData.append("email", email.current.value);
      formData.append("password", password.current.value);
      formData.append("phone", phoneNo.current.value);

      const res = await axios.post(
        myInitObject.homeURL + "/register",
        formData
      );
      if (res.status === 200) {
        // setLoginStatus(true);
        setClicked(true);
        // navigate("/login");
        return;
      } else {
        alert(res.status);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setfail(true);
      } else {
        alert("Something went wrong please try again later");
      }
    }
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      // setLoginStatus(false);
      setfail(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [ fail]);
  return (
    <form className="m-8" onSubmit={submitHandler}>
    
      <div id="defaultModal" tabIndex="-1" aria-hidden="true" className={clicked==false?"hidden":"none" +" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full  m-20 md:inset-0 h-modal md:h-full"}>
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
              
              <div className="relative bg-slate-400 rounded-lg shadow dark:bg-gray-700">
              
                  <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Welcome
                      </h3>
                  </div>
                  <div className="p-6 space-y-6">
                      <p className="text-base leading-relaxed text-black dark:text-gray-400">
                      You are ready to login!!!
                      We are redireacting you  to login
                      </p>
                      
                  </div>
                  <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                      <button onClick={()=>{navigate("/login")}} data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">okay  </button>
                  </div>
              </div>
          </div>
      </div>
      
      {/* {loginStatus && (
        <div
          id="toast-success"
          className="flex items-center w-full  p-4 mb-4 text-gray-500 bg-green-300 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">Register Successfully</div>
        </div>
      )} */}
      {fail && (
        <div
          id="toast-danger"
          className="flex items-center w-full max p-4 mb-4 text-gray-500 bg-red-200 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
          role="alert"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="ml-3 text-sm font-normal">
            Email already registered try using different one or login
          </div>
        </div>
      )}
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm  text-gray-900 dark:text-gray-300 font-black"
        >
          Your Name
        </label>
        <input
          ref={name}
          type="text"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="John"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm  text-gray-900 dark:text-gray-300 font-black"
        >
          Your email
        </label>
        <input
          ref={email}
          type="email"
          id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="name@example.com"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-black text-gray-900 dark:text-gray-300"
        >
          Your password
        </label>
        <input
          ref={password}
          pattern=".{6,}"
          type="password"
          id="password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="secretKey"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="number"
          className=" invisible peer-invalid:visible block mb-2 text-sm font-black text-gray-900 dark:text-gray-300"
        >
          Phone Number
        </label>
        <input
          ref={phoneNo}
          type="text"
          pattern="\d*"
          id="number"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="9999999999"
          required
          minLength={10}
          maxLength={10}
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Register new account
      </button>
    </form>
  );
};

export default RegisterForm;

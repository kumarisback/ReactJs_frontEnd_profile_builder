import { useState, createContext } from "react";

const UserContext = createContext({
  isAuth: false,
  email: null,
  id: null
});

export default UserContext;

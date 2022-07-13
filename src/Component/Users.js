import React, { useState, useEffect } from "react";
import axios from "axios";
// import {homeURL} from '../ApiUrl/url'
import myInitObject from "../ApiUrl/url";
import Card from "./Card";

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(myInitObject.homeURL + "/users");
      
        setData(response.data.content);
       
    };

     fetchData();
  }, []);

  return (
    <div className="   grid justify-items-center  ">
      {data.map((user) => {
        return <Card key={user.id} data={user} />
      })}
    </div>
  );
};

export default Users;

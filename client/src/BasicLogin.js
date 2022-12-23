import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "./vars";
function BasicLogin() {
  const [userAuthStuff, setUserAuthStuff] = useState({
    email: "",
    password: "",
  });
  const signup = async () => {
    try {
      console.log(userAuthStuff);
      const res = await axios.post(BASE_URL + "/auth/signup", userAuthStuff);
      console.log(res);
      localStorage.setItem("user", res.data.token);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/auth/signin", userAuthStuff);
      console.log(res);

      localStorage.setItem("user", res.data.token);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <input
        type={"email"}
        placeholder="Email Id"
        onChange={(e) => {
          setUserAuthStuff((prev) => {
            return { ...prev, email: e.target.value };
          });
        }}
      />
      <input
        type={"password"}
        placeholder="Password"
        onChange={(e) => {
          setUserAuthStuff((prev) => {
            return { ...prev, password: e.target.value };
          });
        }}
      />
      <button onClick={() => signup()}>Signup</button>
      <button onClick={() => signin()}>Signin</button>
    </div>
  );
}

export default BasicLogin;

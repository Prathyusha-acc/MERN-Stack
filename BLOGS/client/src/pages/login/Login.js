import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      alert(`Enter valid credentials ${json.errors}`);
    }
    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      //Get user Id with login email
      let users = await fetch("http://localhost:5000/api/user/all-users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      users = await users.json();
      const user = users.users.find((user) => user.email === credentials.email);
      localStorage.setItem("userId", user._id);
      console.log(
        "In login page :",
        localStorage.getItem("authToken", json.authToken)
      );
      navigate("/");
      window.location.reload();
    }
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="bg-slate-100 h-screen">
      <div className="flex relative pt-28  justify-center ">
        <form
          onSubmit={onSubmit}
          className="flex-col sm:w-4/6 lg:w-2/5 card p-3 items-start"
        >
          <div className=" p-2 border-black">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              className=" p-2 border-inherit bg-slate-100 w-full  rounded focus:placeholder:opacity-0"
            />
          </div>
          <div className=" p-2 border-black">
            <label htmlFor="password" className="form-label">
              password
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              className=" p-2 border-inherit bg-slate-100 w-full  rounded focus:placeholder:opacity-0"
            />
          </div>

          <div className="flex justify-center pt-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>
          </div>
          <Link
            to="/signup"
            className="flex justify-center p-4 text-green-500 hover:text-green-300 items-center"
          >
            I am a new user? Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

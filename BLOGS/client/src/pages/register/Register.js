import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/user/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      alert(`Enter valid credentials ${json.errors}`);
    }
    navigate("/");
    window.location.reload();
  };
  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div className="bg-slate-100 h-screen">
      <div className="flex relative pt-28  justify-center">
        <form
          onSubmit={onSubmit}
          className="flex-col sm:w-2/6 lg:w-2/5 card p-3 items-start"
        >
          <div className=" p-2 border-black">
            <label htmlFor="name" className="">
              Name
            </label>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              className=" p-2 pl-3 border-inherit bg-slate-100 w-full rounded focus:placeholder:opacity-0"
            />
          </div>
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
              Password
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
              Submit
            </button>
          </div>
          <Link
            to="/login"
            className="flex justify-center  p-4 text-green-500 hover:text-green-300 "
          >
            Already a user? Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;

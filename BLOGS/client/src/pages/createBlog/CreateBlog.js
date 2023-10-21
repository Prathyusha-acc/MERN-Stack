import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [credentials, setCredentials] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    userId: userId,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/blog/create-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: credentials.title,
        description: credentials.description,
        image: credentials.image,
        author: credentials.author,
        userId: userId,
      }),
    });
    const json = await response.json();
    console.log("Json Response: ", json);
    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      navigate("/");
      window.location.reload();
    }
  };
  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
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
              Title
            </label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={credentials.title}
              onChange={onChange}
              className=" p-2 border-inherit bg-slate-100 w-full  rounded focus:placeholder:opacity-0"
            />
          </div>
          <div className=" p-2 border-black">
            <label htmlFor="password" className="form-label">
              Description
            </label>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={credentials.description}
              onChange={onChange}
              className=" p-2 border-inherit bg-slate-100 w-full  rounded focus:placeholder:opacity-0"
            />
          </div>
          <div className=" p-2 border-black">
            <label htmlFor="imageURL" className="form-label">
              ImageURL
            </label>
            <input
              type="text"
              placeholder="image URL"
              name="image"
              value={credentials.image}
              onChange={onChange}
              className=" p-2 border-inherit bg-slate-100 w-full  rounded focus:placeholder:opacity-0"
            />
          </div>
          <div className=" p-2 border-black">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              placeholder="author name"
              name="author"
              value={credentials.author}
              onChange={onChange}
              className=" p-2 border-inherit bg-slate-100 w-full  rounded focus:placeholder:opacity-0"
            />
          </div>
          {/* <div className=" p-2 border-black">
            <label htmlFor="author" className="form-label">
              UserId
            </label>
            <input
              type="text"
              placeholder="UserID"
              name="userId"
              value={credentials.userId}
              onChange={onChange}
              className=" p-2 border-inherit bg-slate-100 w-full  rounded focus:placeholder:opacity-0"
            />
          </div> */}

          <div className="flex justify-center pt-5">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

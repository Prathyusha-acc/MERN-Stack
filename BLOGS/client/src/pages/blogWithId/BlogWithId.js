import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const BlogWithId = () => {
  const currentUrl = window.location.pathname;
  const [blog, setBlog] = useState([]);
  const navigate = useNavigate();
  const getBlog = async () => {
    try {
      let response = await fetch(
        `http://localhost:5000/api/blog${currentUrl}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      const features = { ...response.blog };
      setBlog(features);
    } catch (error) {
      console.log(error.message);
    }
  };
  const backPage = () => {
    navigate(-1);
  };
  useEffect(() => {
    getBlog();
    console.log(blog.title);
  }, []);

  return (
    <div className="m-0 p-10">
      <div onClick={backPage} className="cursor-pointer pb-4 text-2xl">
        <BiArrowBack />
      </div>
      <div className="leading-relax">
        <div className="flex justify-center">
          <img src={blog.image} alt="" className="h-52 w-80 rounded-md" />
        </div>
        <h2 className="flex p-3 justify-center font-bold text-lg">
          {blog.title}
        </h2>
        <div>{blog.description}</div>
        <div className="mt-5">
          <p>Author Name: {blog.author}</p>
          <p>Created At: {blog.date}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogWithId;

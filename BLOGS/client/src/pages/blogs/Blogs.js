import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Card from "../card/Card";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const [search, setSearch] = useState("");
  const getAllBlogs = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/blog/all-blogs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setBlogs(response.blogs);
      console.log("ALL BLogs : ", response);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div className="">
      <div className="flex justify-center p-5">
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="top-4 left-52 w-5/6 h-10 rounded px-5 outline-none bg-pink-400 placeholder:text-white text-lg"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 mx-2 min-[px]:grid-cols760-1 max-[530px]:grid-cols-1">
        {blogs
          ? blogs
              .filter((item) =>
                item.title.toLowerCase().includes(search.toLocaleLowerCase())
              )
              .map((blog, i) => {
                return (
                  <div key={blog._id}>
                    <Card blog={blog} />
                  </div>
                );
              })
          : ""}
      </div>
    </div>
  );
};

export default Blogs;

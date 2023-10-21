import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Card = (props) => {
  const navigate = useNavigate();
  let features = props.blog;
  let { title, image, author, date } = { ...features };
  const blogPage = () => {
    localStorage.setItem("blogId", features._id);
    navigate(`/get-blog/${features._id}`);
  };

  return (
    <div>
      <div className="card cursor-pointer" onClick={blogPage}>
        <div>
          <img src={image} alt="" className="w-full h-48 object-fit" />
        </div>
        <div className="font-semibold text-lg mt-3">{title}</div>
        <div className="text-slate-500">
          <p>{author}</p>
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

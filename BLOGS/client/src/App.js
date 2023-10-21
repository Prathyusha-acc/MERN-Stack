import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Blogs from "./pages/blogs/Blogs";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import UserBlogs from "./pages/userblogs/UserBlogs";
import CreateBlog from "./pages/createBlog/CreateBlog";
import BlogPage from "./pages/blogWithId/BlogWithId";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/get-blog/:id" element={<BlogPage />} />
      </Routes>
    </>
  );
}

export default App;

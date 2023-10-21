const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  getUserBlogs,
} = require("../controller/blogController");
const router = express.Router();

//get all blogs
router.get("/all-blogs", getAllBlogsController);

//create blog
router.post("/create-blog", createBlogController);

//update blog
router.put("/update-blog/:id", updateBlogController);

//Single blog details
router.get("/get-blog/:id", getBlogByIdController);

//get user blogs
router.get("/user-blog/:id", getUserBlogs);
//delete blog
router.delete("/delete-blog/:id", deleteBlogController);

module.exports = router;

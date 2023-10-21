const mongoose = require("mongoose");

const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//GET all Blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(500).json({
        success: false,
        message: "No Blogs Found",
        error,
      });
    }
    return res.status(500).json({
      success: true,
      message: "All Blogs list",
      blogCount: blogs.length,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error While Getting All Blogs",
      error,
    });
  }
};

//Create Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, author, date, userId } = req.body;
    //validation
    if (!title || !description || !image || !author || !userId) {
      return res.status(400).json({
        success: false,
        message: "required all fields",
      });
    }
    const existingUser = await userModel.findById(userId);
    //validation
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "unable to find user",
      });
    }
    const newBlog = new blogModel({
      title,
      description,
      image,
      author,
      date,
      userId,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).json({
      success: true,
      message: "Blog Created Successfully",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error While Creating Blog",
      error,
    });
  }
};

//update Blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, author, date } = req.body;
    const updatedBlog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Blog Updated Successfully",
      updatedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error While Updating Blog",
      error,
    });
  }
};

//Single Blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found with this id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "successfully fetched Single Blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error While Getting Single Blog",
      error,
    });
  }
};

//get user blog
exports.getUserBlogs = async (req, res) => {
  try {
    console.log("ID: ", req.params.id);
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).json({
        success: false,
        message: "blogs not found with this id",
      });
    }
    console.log("User BLOGS: ", userBlog);
    return res.status(200).json({
      success: true,
      message: "successfully fetched user Blog",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error While Getting user Blog",
      error,
    });
  }
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findOneAndDelete(req.params.id)
      .populate("user");
    console.log("BLOG: ", blog);
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).json({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error While Deleting Blog",
      error,
    });
  }
};

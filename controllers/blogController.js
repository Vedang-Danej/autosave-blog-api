import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// asyncHandler middleware for handling exceptions inside of async express routes
//  and passing them to error handlers, so we don't have to use a try catch block
// everytime

export const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

export const getOneBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  res.json(blog);
});

export const postBlog = asyncHandler(async (req, res) => {
  const { blogContent, author, title } = req.body;
  const blog = new Blog({ author, blogContent, title });
  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

export const updateBlog = asyncHandler(async (req, res) => {
  const { updatedContent, updatedTitle, updatedAuthor } = req.body;
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new Error('Problem occured in updating the blog.');
  if (updatedAuthor) blog.author = updatedAuthor;
  if (updatedContent) blog.blogContent = updatedContent;
  if (updatedTitle) blog.title = updatedTitle;
  blog.save();
  res.json(blog);
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new Error('Problem occured in deleting the blog.');
  await Blog.deleteOne({ _id: req.params.id });
  res.json({ message: 'The Blog has been removed' });
});

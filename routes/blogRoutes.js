import express from 'express';
import {
  deleteBlog,
  getAllBlogs,
  getOneBlog,
  postBlog,
  updateBlog,
} from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getAllBlogs);

router.post('/', postBlog);

router.get('/:id', getOneBlog);

router.put('/:id', updateBlog);

router.delete('/:id', deleteBlog);

export default router;

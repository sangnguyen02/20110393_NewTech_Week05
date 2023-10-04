// controllers/blogController.js
const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blog');

// Hiển thị danh sách bài viết
router.get('/index', (req, res) => {
  const posts = BlogPost.getAllPosts();
  res.render('index', { posts });
});

// Hiển thị chi tiết một bài viết và các comments
router.get('/post/:id', (req, res) => {
  const postId = req.params.id;
  const post = BlogPost.getPostById(postId);
  res.render('post', { post });
});

// Hiển thị trang tạo bài viết mới
router.get('/new', (req, res) => {
  res.render('new');
});

// Xử lý tạo bài viết mới
router.post('/new', (req, res) => {
  const { title, content } = req.body;
  BlogPost.createPost(title, content);
  res.redirect('/blog/index');
});

// Hiển thị trang sửa bài viết
router.get('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const post = BlogPost.getPostById(postId);
  res.render('edit', { post });
});

// Xử lý sửa bài viết
router.post('/edit/:id', (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;
  BlogPost.updatePost(postId, title, content);
  res.redirect('/blog/index');
});

// Xóa bài viết
router.post('/delete/:id', (req, res) => {
  const postId = req.params.id;
  BlogPost.deletePost(postId);
  res.redirect('/blog/index');
});

// Thêm comment vào bài viết
router.post('/comment/:id', (req, res) => {
  const postId = req.params.id;
  const comment = req.body.comment;
  const post = BlogPost.getPostById(postId);
  if (post) {
    post.addComment(comment);
  }
  res.redirect(`/blog/post/${postId}`);
});

module.exports = router;

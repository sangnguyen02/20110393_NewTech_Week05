// models/BlogPost.js
class Blog {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.comments = [];
  }

  static getAllPosts() {
    return this.posts || [];
  }

  static getPostById(id) {
    return this.posts.find(post => post.id === id);
  }

  static createPost(title, content) {
    const id = Math.random().toString(36).substring(7);
    const newPost = new Blog(id, title, content);
    if (!this.posts) {
      this.posts = [];
    }
    this.posts.push(newPost);
    return newPost;
  }

  static updatePost(id, title, content) {
    const post = this.getPostById(id);
    if (post) {
      post.title = title;
      post.content = content;
    }
    return post;
  }

  static deletePost(id) {
    const index = this.posts.findIndex(post => post.id === id);
    if (index !== -1) {
      this.posts.splice(index, 1);
    }
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}

module.exports = Blog;

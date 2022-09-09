const Post = require('../models/Post');
// A map of functions which return data for the schema.
const postResolvers = {
  Query: {
    hello: () => 'world',

    getAllPosts: async () => {
      return await Post.find();
    },
    getPostById: async (root, args, context) => {
      const { id } = args;
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (root, args, context) => {
      const { title, text } = args.post;
      const post = new Post({ title, text });
      await post.save();
      return post;
    },
    deletePost: async (root, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return 'Post deleted';
    },
    updatePost: async (root, args, context, info) => {
      const { id } = args;
      const { title, text } = args.post;
      const updates = {};
      if (title !== undefined) {
        updates.title = title;
      }
      if (text !== undefined) {
        updates.text = text;
      }
      const post = await Post.findByIdAndUpdate(id, updates, { new: true });
      return post;
    },
  },
};

module.exports = postResolvers;

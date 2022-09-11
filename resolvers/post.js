const Post = require('../models/Post');
const { requiresAuth } = require('../permissions');
// A map of functions which return data for the schema.
const postResolvers = {
  Query: {
    hello: () => 'world',

    getAllPosts: async (root, args, context) => {
      return await Post.find();
    },
    getPostById: async (root, args, context) => {
      const { id } = args;
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: requiresAuth.createResolver(async (root, args, context) => {
      if (context.user === undefined) {
        throw new Error('You must login to register');
      } else {
        const { title, text } = args.post;
        const post = new Post({ title, text });
        post.user = context.user.id;
        await post.save();
        return post;
      }
    }),
    deletePost: requiresAuth.createResolver(
      async (root, args, context, info) => {
        const { user } = context;
        const { id } = args;
        const post = await Post.findById(id);
        if (!post) {
          throw new Error('No post available');
        }
        if (post.user.toString() !== user.id) {
          throw new Error('You are not owner of this post');
        }
        await Post.findByIdAndDelete(id);
        return 'Post deleted';
      }
    ),
    updatePost: requiresAuth.createResolver(
      async (root, args, context, info) => {
        const { user } = context;
        const { id } = args;
        const { title, text } = args.post;
        const updates = {};
        if (title !== undefined) {
          updates.title = title;
        }
        if (text !== undefined) {
          updates.text = text;
        }
        const post = await Post.findById(id);
        if (!post) {
          throw new Error('No post available');
        }
        if (post.user.toString() !== user.id) {
          throw new Error('You are not owner of this post');
        }
        return await Post.findByIdAndUpdate(id, updates, { new: true });
      }
    ),
  },
};

module.exports = postResolvers;

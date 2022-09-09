const { gql } = require('apollo-server-express');

const postTypeDefs = gql`
  type Post {
    id: ID
    title: String
    text: String
  }
  type Query {
    hello: String

    getAllPosts: [Post]
    getPostById(id: ID): Post
  }

  input PostInput {
    title: String
    text: String
  }
  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`;

module.exports = { postTypeDefs };

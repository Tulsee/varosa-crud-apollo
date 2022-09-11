const { gql } = require('apollo-server-express');

const postTypeDefs = gql`
  type Post {
    id: ID
    title: String
    text: String
    user: ID
  }
  type Posts {
    post: [Post]
    count: Int
    totalPages: Int
    currentPage: Int
  }
  type Query {
    hello: String

    getAllPosts(limit: Int, page: Int): Posts
    getPostById(id: ID): Post
  }

  input PostInput {
    title: String
    text: String
    user: ID
  }
  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`;

module.exports = { postTypeDefs };

const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
  }
  type Query {
    user: String
    getAllUsers: [User]
  }
  input RegisterInput {
    name: String
    email: String
    password: String
  }
  input LoginInput {
    email: String
    password: String
  }
  type Mutation {
    registerUser(user: RegisterInput): User
    loginUser(user: LoginInput): String
  }
`;
module.exports = { userTypeDefs };

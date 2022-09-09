const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    id: ID
    name: String
    password: String
  }
  type Query {
    getAllUsers: [User]
  }
`;
module.exports = { userTypeDefs };

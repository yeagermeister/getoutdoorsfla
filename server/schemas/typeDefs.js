const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Users {
    _id: ID!
    username: String!
    email: String!
    admin: Boolean
  }

  type Auth {
    token: ID!
    user: Users
  }

  type Query {
    user: [Users]
    users: [Users]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
 
`;

module.exports = typeDefs;

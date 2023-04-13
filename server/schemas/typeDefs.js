const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Users {
    _id: ID!
    username: String!
    email: String!
    admin: Boolean
  }

 
  type Query {
    user: [Users]
  }

 
`;

module.exports = typeDefs;

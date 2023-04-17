const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Users {
    _id: ID!
    username: String!
    email: String!
    admin: Boolean
  }

  type NewSite {
    _id: ID!
    siteName: String!
    description: String!
    zipcode: Int!
    camping: Boolean
    pets: Boolean
    statepark: Boolean
    park: Boolean
    beach: Boolean
    swimmingHole: Boolean
    spring: Boolean
    free: Boolean
  }

  type Site {
    _id: ID!
    siteName: String!
    description: String!
    imageURL: String!
    zipcode: Int!
    camping: Boolean
    pets: Boolean
    statepark: Boolean
    park: Boolean
    beach: Boolean
    swimmingHole: Boolean
    spring: Boolean
    free: Boolean
    lat: Int!
    lon: Int!
  }

  type Auth {
    token: ID!
    user: Users
  }

  type Query {
    user(username:String!): Users
    users: [Users]
    newSite: [NewSite]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    deleteUser(id: ID!): Users!
    addSite(siteName: String!, description: String!, zipcode: Int!, camping: Boolean, pets: Boolean, statepark: Boolean, park: Boolean, beach: Boolean, swimmingHole: Boolean, spring: Boolean, free: Boolean): NewSite
    login(email: String!, password: String!): Auth
    addProdSite(siteName: String!, description: String!, imageURL: String!, zipcode: Int!, camping: Boolean, pets: Boolean, statepark: Boolean, park: Boolean, beach: Boolean, swimmingHole: Boolean, spring: Boolean, free: Boolean, lat: Int!, lon: Int!): Site
  }
 
`;

module.exports = typeDefs;

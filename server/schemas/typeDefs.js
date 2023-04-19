const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar Date
  type Users {
    _id: ID!
    username: String!
    email: String!
    admin: Boolean
  }
  type Comment {
    commentid: ID!
    Comment: String!
    createdAt: Date
    username
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
    lat: Float!
    lon: Float!
  }

  type Auth {
    token: ID!
    user: Users
  }

  type Query {
    findOneUser(username:String!): Users
    findAllUsers: [Users]
    findAllNewSites: [NewSite]
    findOneNewSite(siteName:String!): NewSite
    findAllSites: [Site]
    findOneSite(siteName:String!): Site
    findUserComments(username: String!): [Comment]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    deleteUser(id: ID!): Users!
    addSite(NewSite: siteInput!): NewSite
    login(email: String!, password: String!): Auth
    addProdSite(site: prodSiteInput!): Site
  }
 
  input siteInput {
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

  input prodSiteInput {
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
    lat: Float!
    lon: Float!
  }
`;

module.exports = typeDefs;

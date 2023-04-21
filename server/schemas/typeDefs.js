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
    commentId: ID!
    comment: String!
    createdAt: Date
    username: Users!
    site: Site!
  }
  type Rating {
    ratingId: ID!
    rating: Int!
    username: Users!
    site: Site!
  }
  type NewSite {
    _id: ID!
    siteName: String!
    description: String
    zipcode: Int
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
    imageURL: String
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
    rating: [Rating]
    comment: [Comment]
  }


  type Comment {
    commentId: ID!
    comment: String!
    createdAt: Date
    username: Users!
    site: Site!
  }

  type Rating {
    ratingId: ID!
    rating: Int!
    username: Users!
    site: Site!
  }


  type Auth {
    token: ID!
    user: Users
  }

  type Query {
    findOneUser(username:String!): Users
    findAllUsers: [Users]
    findAllNewSites: [NewSite]
    findOneNewSite(_id:ID!): NewSite
    findAllSites: [Site]
    findOneSite(siteName:String!): Site
    findUserComments(username: String!): [Comment]
    comments: [Comment]
    ratings: [Rating]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    deleteUser(id: ID!): Users!
    addSite(siteName: String!, description: String!, zipcode: Int!, camping: Boolean, pets: Boolean, statepark: Boolean, park: Boolean, beach: Boolean, swimmingHole: Boolean, spring: Boolean, free: Boolean): NewSite!
    deleteSite(id: ID!): NewSite!
    login(email: String!, password: String!): Auth
    addProdSite(site: prodSiteInput!): Site
    addComment(comment: String!, username: String!, siteId: ID!): Comment
    deleteComment(commentId: ID!): Comment!
    addRating(rating: Int!, username: String!, siteId: ID!): Rating
    deleteRating(ratingId: ID!): Rating!
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

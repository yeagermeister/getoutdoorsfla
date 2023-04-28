const { gql } = require('apollo-server-express');

const typeDefs = `
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
    userID: Users!
    site: Site!
  }

  type Rating {
    ratingId: ID!
    rating: Int!
    userID: Users!
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
    altText: String!
    rating: [Rating]
    comments: [Comment]
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
    findOneSite(_id: ID!): Site 
    findUserComments(userID: String!): [Comment]
    findUserRatings(userID: ID!): [Rating]
    getRatingByUserAndSite(userId: ID!, siteId: String!): Rating
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    deleteUser(id: ID!): Users!
    addSite(siteName: String!, description: String!, zipcode: Int!, camping: Boolean, pets: Boolean, statepark: Boolean, park: Boolean, beach: Boolean, swimmingHole: Boolean, spring: Boolean, free: Boolean): NewSite!
    deleteSite(id: ID!): NewSite!
    login(email: String!, password: String!): Auth
    addProdSite(siteName: String!, description: String!, zipcode: Int!, camping: Boolean, pets: Boolean, statepark: Boolean, park: Boolean, beach: Boolean, swimmingHole: Boolean, spring: Boolean, free: Boolean, lat: Float!, lon: Float!, imageURL: String, altText: String! ): Site!
    addComment(comment: String!, userID: String!, siteId: ID!): Comment
    deleteComment(commentId: ID!): Comment!
    addRating(rating: Int!, siteId: ID!): Rating
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

  input ratingInput {
    rating: Int!
    site: ID!
  }

  input commentInput {
    comment: String!
    userID: String!
    siteId: ID!
  }

  type Subscription {
    newSite: NewSite!
    newComment(siteId: ID!): Comment!
    newRating(siteId: ID!): Rating!
  }

`;

module.exports = typeDefs;

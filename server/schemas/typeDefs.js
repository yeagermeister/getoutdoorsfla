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


  type Comment {
    commentId: ID!
    comment: String!
    createdAt: String!
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
    user(username: String!): Users
    users: [Users]
    newSite: [NewSite]
    Site: [Site]
    comments: [Comment]
    ratings: [Rating]
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
    addComment(comment: String!, username: String!, siteId: ID!): Comment
    deleteComment(commentId: ID!): Comment!
    addRating(rating: Int!, username: String!, siteId: ID!): Rating
    deleteRating(ratingId: ID!): Rating!
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

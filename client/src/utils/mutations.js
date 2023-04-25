import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        admin
      }
    }
  }
`;



export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SITE = gql`
mutation AddSite($siteName: String!, $description: String!, $zipcode: Int!, $camping: Boolean, $pets: Boolean, $statepark: Boolean, $park: Boolean, $beach: Boolean, $swimmingHole: Boolean, $spring: Boolean, $free: Boolean) {
  addSite(siteName: $siteName, description: $description, zipcode: $zipcode, camping: $camping, pets: $pets, statepark: $statepark, park: $park, beach: $beach, swimmingHole: $swimmingHole, spring: $spring, free: $free) {
    free
    park
    pets
    description
    statepark
    beach
    camping
    siteName
    spring
    swimmingHole
    zipcode
  }
}
`;

export const SEND_TO_PROD = gql`
mutation AddProdSite($siteName: String!, $description: String!, $zipcode: Int!, $free: Boolean, $lat: Float!, $lon: Float!, $imageURL: String!, $statepark: Boolean, $spring: Boolean, $camping: Boolean, $pets: Boolean, $park: Boolean, $beach: Boolean, $swimmingHole: Boolean, $altText: String!) {
  addProdSite(siteName: $siteName, description: $description, zipcode: $zipcode, free: $free, lat: $lat, lon: $lon, imageURL: $imageURL, statepark: $statepark, spring: $spring, camping: $camping, pets: $pets, park: $park, beach: $beach, swimmingHole: $swimmingHole, altText: $altText) {
    spring
    statepark
    siteName
    beach
    camping
    description
    free
    imageURL
    lat
    lon
    park
    pets
    swimmingHole
    zipcode
    altText
  }
}
`;



export const ADD_COMMENT = gql`
mutation Mutation($comment: String!, $userID: String!, $siteId: ID!) {
  addComment(comment: $comment, userID: $userID, siteId: $siteId) {
    comment
    commentId
    createdAt
  }
}
`;

export const DELETE_USER = gql`
mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId) {
    username
  }
}
`;

export const DELETE_NEW_SITE = gql`
mutation Mutation($deleteSiteId: ID!) {
  deleteSite(id: $deleteSiteId) {
    _id
  }
}
`;

export const NEW_RATING = gql`
mutation Mutation($rating: Int!, $siteId: ID!) {
  addRating(rating: $rating, siteId: $siteId) {
    rating
    ratingId
  }
}
`
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
mutation Mutation($site: prodSiteInput!) {
  addProdSite(site: $site) {
    _id
    beach
    camping
    description
    free
    imageURL
    lat
    lon
    park
    pets
    siteName
    spring
    statepark
    swimmingHole
    zipcode
  }
}
`;



export const ADD_COMMENT = gql`
mutation Mutation($comment: String!, $username: String!, $siteId: ID!) {
  addComment(comment: $comment, username: $username, siteId: $siteId) {
    comment
    commentId
    createdAt
    username {
      username
    }
    site {
      siteName
      _id
    }
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
    siteName
  }
}
`; 
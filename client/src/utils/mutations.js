import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
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
  mutation addSite($siteName: String!, $description: String!, $zipcode: Integer!, $camping: Boolean, $pets: Boolean, 
      $statepark: Boolean, $park: Boolean, $beach: Boolean, $swimmingHole: Boolean, $spring: Boolean, $free: Boolean) {
    addSite(sitename: $sitename, description: $description, zipcode: $zipcode, camping: $camping, pets: $pets, 
      statepark: $statepark, park: $park, beach: $beach, swimmingHole: $swimmingHole, spring: $spring, free: $free)
  }
`;

export const ADD_PROD_SITE = gql`
  mutation addSite($siteName: String!, $description: String!, $imageURL: String!, $zipcode: Integer!, $camping: Boolean, $pets: Boolean, 
      $statepark: Boolean, $park: Boolean, $beach: Boolean, $swimmingHole: Boolean, $spring: Boolean, $free: Boolean, $lat: Integer!, $lon: Integer!) {
    addSite(siteName: $siteName, description: $description, imageURL: $imageURL, zipcode: $zipcode, camping: $camping, pets: $pets, 
      statepark: $statepark, park: $park, beach: $beach, swimmingHole: $swimmingHole, spring: $spring, free: $free, lat: $lat, lon: $lon) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
    addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $thoughtId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      thoughtId: $thoughtId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

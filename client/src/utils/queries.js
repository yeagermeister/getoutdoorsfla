import { gql } from '@apollo/client';

export const USERS_QUERY= gql`
query users {
  findAllUsers {
    admin
    email
    username
    _id
  }
}
`;

export const FIND_ONE_USER=gql`
query Query($username: String!) {
  findOneUser(username: $username) {
    username
    email
    admin
    _id
  }
}
`;

export const NEWSITE_QUERY= gql`
query sites {
  findAllNewSites {
    _id
    beach
    camping
    description
    free
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

export const FIND_ONE_SITE = gql`
query Query($siteName: String!) {
  findOneSite(siteName: $siteName) {
    _id
    beach
    camping
    comment {
      comment
      commentId
      createdAt
      username {
        username
        _id
      }
    }
    zipcode
    swimmingHole
    statepark
    spring
    siteName
    pets
    park
    lon
    lat
    imageURL
    free
    description
    rating {
      rating
      ratingId
    }
  }
}
`;


export const SITE_QUERY = gql`
query sites {
  findAllSites {
    _id
    description
    imageURL
    lat
    lon
    rating {
      rating
    }
    siteName
  }
}
`;

export const FIND_ONE_NEWSITE = gql`
query FindOneNewSite($findOneNewSiteId: ID!) {
  findOneNewSite(_id: $findOneNewSiteId) {
    _id
  }
}
`;

export const FIND_USER_COMMENTS = gql`
query Query($username: String!) {
  findUserComments(username: $username) {
    comment
    commentId
    createdAt
    site {
      _id
      siteName
    }
  }
}
`

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
query FindOneSite($id: ID!) {
  findOneSite(_id: $id) {
    _id
    siteName
    description
    imageURL
    zipcode
    camping
    pets
    statepark
    park
    beach
    swimmingHole
    spring
    free
    lat
    lon
    altText
  }
}
`;


export const SITE_QUERY = gql`
query sites {
  findAllSites {
    _id
    description
    imageURL
    altText
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
export const FIND_ALL_SITES = gql`
query FindAllSites {
  findAllSites {
    _id
    description
    imageURL
    lat
    lon
    siteName
    zipcode
    altText
  }
}
`
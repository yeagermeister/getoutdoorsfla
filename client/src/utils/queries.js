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
`

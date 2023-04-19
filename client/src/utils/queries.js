import { gql } from '@apollo/client';

export const USERS_QUERY= gql`
query getUsers {
    users {
        _id
        username
        email
        admin
      }
}
`;

export const NEWSITE_QUERY= gql`
query getNewSite {
    newSite {
        _id
        siteName
        description
        zipcode
        camping
        pets
        statepark
        park
        beach
        swimmingHole
        spring
        free
      }
}
`;

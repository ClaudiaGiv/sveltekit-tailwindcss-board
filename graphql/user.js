import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $email: String!
    $name: String!
    $roles: [Role]!
    $identityId: String!
  ) {
    createUser(
      data: {
        email: $email
        name: $name
        roles: $roles
        identityId: $identityId
      }
    ) {
      _id
      email
      name
      roles
      identityId
    }
  }
`;

export const USER_BY_EMAIL_QUERY = gql`
  query userByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      email
      name
      identityId
      roles
    }
  }
`;

export const ALL_USERS_QUERY = gql`
  query allUsers {
    allUsers {
      data {
        _id
        email
        name
        identityId
        roles
      }
    }
  }
`;

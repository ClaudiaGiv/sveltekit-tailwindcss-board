export const ALL_ORGANIZATIONS_QUERY = `
  query allOrganizations {
    allOrganizations {
      data {
        _id
        name
        users {
          data {
            _id
            name
            email
          }
        }
      }
    }
  }
`;

export const ORGANIZATION_BY_ID_QUERY = `
  query findOrganizationByID($id: ID) {
    findOrganizationByID(id: $id) {
      data {
        _id
        name
        users {
          data {
            _id
            name
            email
          }
        }
      }
    }
  }
`;

export const ORGANIZATION_BY_NAME_QUERY = `
  query findOrganizationByName($name: String) {
    findOrganizationByName(name: $name) {
      data {
        _id
        name
        users {
          data {
            _id
            name
            email
          }
        }
      }
    }
  }
`;

export const CREATE_ORGANIZATION_MUTATION = `
  mutation createOrganization($name: String!, $usersId: [ID]!) {
    createOrganization(data: { name: $name, users: { connect: $usersId } }) {
      name
      users {
        data {
          _id
          name
          email
        }
      }
    }
  }
`;

export const UPDATE_ORGANIZATION_MUTATION = `
  mutation updateOrganization($id: ID!, $name: String!, $usersId: [ID]!) {
    updateOrganization(
      id: $id
      data: { name: $name, users: { connect: $usersId } }
    ) {
      name
      users {
        data {
          _id
          name
          email
        }
      }
    }
  }
`;

export const ADD_USERS_TO_ORGANIZATION_MUTATION = `
  mutation updateOrganization($id: ID!, $usersId: [ID]!) {
    updateOrganization(id: $id, data: { users: { connect: $usersId } }) {
      name
      users {
        data {
          _id
          name
          email
        }
      }
    }
  }
`;

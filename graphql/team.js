import gql from "graphql-tag";

export const ALL_TEAMS_QUERY = gql`
  query allTeams {
    allTeams {
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
        organization {
          _id
          name
        }
      }
    }
  }
`;

export const TEAM_BY_ID_QUERY = gql`
  query findTeamByID($id: ID!) {
    findTeamByID(id: $id) {
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
        organization {
          _id
          name
        }
      }
    }
  }
`;
export const TEAM_BY_NAME_QUERY = gql`
  query findTeamByName($name: String!) {
    findTeamByName(name: $name) {
      _id
      name
      users {
        data {
          _id
          name
          email
        }
      }
      organization {
        _id
        name
      }
    }
  }
`;

export const CREATE_TEAM_MUTATION = gql`
  mutation createTeam($name: String!, $organizationId: ID!, $usersId: [ID]!) {
    createTeam(
      data: {
        name: $name
        organization: { connect: $organizationId }
        users: { connect: $usersId }
      }
    ) {
      name
      users {
        data {
          _id
          name
          email
        }
      }
      organization {
        _id
        name
      }
    }
  }
`;

export const UPDATE_TEAM_MUTATION = gql`
  mutation updateTeam($id: ID!, $name: String!, $usersId: [ID]!) {
    updateTeam(id: $id, data: { name: $name, users: { connect: $usersId } }) {
      name
      users {
        data {
          _id
          name
          email
        }
      }
      organization {
        _id
        name
      }
    }
  }
`;

export const ADD_USERS_TO_TEAM_MUTATION = gql`
  mutation updateTeam($id: ID!, $usersId: [ID]!) {
    updateTeam(id: $id, data: { users: { connect: $usersId } }) {
      name
      users {
        data {
          _id
          name
          email
        }
      }
      organization {
        _id
        name
      }
    }
  }
`;

export const DELETE_TEAM_MUTATION = gql`
  mutation deleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      _id
      name
    }
  }
`;

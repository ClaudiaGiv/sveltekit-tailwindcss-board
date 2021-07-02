import gql from "graphql-tag";

export const CREATE_COLUMN_MUTATION = gql`
  mutation createColumn($title: String!, $description: String!) {
    createColumn(data: { title: $title, description: $description }) {
      _id
      title
      description
    }
  }
`;

export const UPDATE_COLUMN_WEIGHT_MUTATION = gql`
  mutation updateColumn($id: ID!, $weight: Int!) {
    updateColumn(id: $id, data: { weight: $weight }) {
      _id
      weight
    }
  }
`;

export const DELETE_COLUMN_MUTATION = gql`
  mutation deleteColumn($ID: ID!) {
    deleteColumn(id: $ID) {
      _id
      title
      description
    }
  }
`;

export const ALL_COLUMNS_QUERY = gql`
  query allColumns {
    allColumns {
      data {
        _id
        title
        cards {
          data {
            _id
            title
            description
          }
        }
      }
    }
  }
`;

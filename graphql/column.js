
export const CREATE_COLUMN_MUTATION = `
  mutation createColumn($title: String!, $description: String!) {
    createColumn(data: { title: $title, description: $description }) {
      _id
      title
      description
    }
  }
`;

export const UPDATE_COLUMN_WEIGHT_MUTATION = `
  mutation updateColumn($id: ID!, $weight: Int!) {
    updateColumn(id: $id, data: { weight: $weight }) {
      _id
      weight
    }
  }
`;

export const DELETE_COLUMN_MUTATION = `
  mutation deleteColumn($ID: ID!) {
    deleteColumn(id: $ID) {
      _id
      title
      description
    }
  }
`;

export const ALL_COLUMNS_QUERY = `
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

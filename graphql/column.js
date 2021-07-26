
export const CREATE_COLUMN_MUTATION = `
  mutation createColumn(
    $title: String!
    $description: String!
    $weight: Int!
    $boarId: ID!
  ) {
    createColumn(
      data: {
        title: $title
        description: $description
        weight: $weight
        board: { connect: $boarId }
      }
    ) {
      _id
      title
      description
      weight
    }
  }
`;

export const UPDATE_COLUMN_MUTATION = `
  mutation updateColumn(
    $_id: ID!
    $title: String!
    $description: String!
    $weight: Int!
  ) {
    updateColumn(
      id: $_id
      data: { title: $title, description: $description, weight: $weight }
    ) {
      _id
      title
      description
      weight
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

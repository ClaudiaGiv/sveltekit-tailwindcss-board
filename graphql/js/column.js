import gql from 'graphql-tag';

export const CREATE_COLUMN_MUTATION = `
  mutation createColumn(
    $title: String!
    $description: String!
    $weight: Int!
    $boardId: ID!
  ) {
    createColumn(
      data: {
        title: $title
        description: $description
        weight: $weight
        board: { connect: $boardId }
        cards: {
            create: []
      	}
      }
    ) {
      _id
      title
      description
      weight
      cards {
      	data {
      		_id
      	}
      }
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
      cards {
      	data {
      		_id
      		title
      		description
      		weight
      	}
      }
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

export const DELETE_COLUMN_MUTATION = `
  mutation deleteColumn($id: ID!) {
    deleteColumn(id: $id) {
      _id
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

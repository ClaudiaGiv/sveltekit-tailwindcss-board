export const CREATE_CARD_MUTATION = `
  mutation createCard(
    $title: String!
    $description: String!
    $weight: Int!
    $columnId: ID!
  ) {
    createCard(
      data: {
        title: $title
        description: $description
        weight: $weight
        column: { connect: $columnId }
      }
    ) {
      _id
      title
      description
      weight
    }
  }
`;

export const DELETE_CARD_MUTATION = `
  mutation deleteCard($id: ID!) 
  {
    deleteCard(id: $id) {
      _id
    }
  }
`;
//
// export const UPDATE_CARD_WEIGHT_MUTATION = `
//   mutation updateCard($id: ID!, $weight: Int!) {
//     updateCard(id: $id, data: { weight: $weight }) {
//       _id
//       weight
//     }
//   }
// `;
// export const UPDATE_CARD_WEIGHT_AND_COLUMN_MUTATION = `
//   mutation updateCard($id: ID!, $weight: Int!, $columnId: ID!) {
//     updateCard(
//       id: $id
//       data: { weight: $weight, column: { connect: $columnId } }
//     ) {
//       _id
//       weight
//     }
//   }
// `;
//
export const UPDATE_CARD_MUTATION = `
  mutation updateCard(
    $_id: ID!
    $title: String!
    $description: String!
    $weight: Int!
  ) {
    updateCard(
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
//
// export const MOVE_CARD_MUTATION = `
//   mutation moveCard($fromColumnId: ID!, $toColumnId: ID!, $taskId: [ID]!) {
//     update1: updateColumn(
//       id: $fromColumnId
//       data: { cards: { disconnect: $taskId } }
//     ) {
//       _id
//     }
//     update2: updateColumn(
//       id: $toColumnId
//       data: { cards: { connect: $taskId } }
//     ) {
//       _id
//       title
//     }
//   }
// `;

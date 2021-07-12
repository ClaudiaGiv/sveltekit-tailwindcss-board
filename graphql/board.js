//
// export const ALL_BOARDS_QUERY = `
//   query allBoards {
//     allBoards {
//       data {
//         _id
//         title
//         description
//         locked
//         user
//         columns {
//           data {
//             _id
//             title
//             description
//             cards {
//               data {
//                 _id
//                 title
//                 description
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const CREATE_DEFAULT_BOARD_MUTATION = `
  mutation createBoard(
    $title: String!
    $description: String!
    $userId: ID!
    $columns: [ColumnInput]!
  ) {
    createBoard(
      data: {
        title: $title
        description: $description
        user: { connect: $userId }
        columns: { create: $columns }
      }
    ) {
      _id
      title
      description
      columns {
        data {
          _id
          title
        }
      }
    }
  }
`;

//
// export const BOARD_BY_TITLE_QUERY = `
//   query boardByTitle($title: String!) {
//     boardByTitle(title: $title) {
//       _id
//       title
//       description
//       locked
//       columns {
//         data {
//           _id
//           title
//           description
//           weight
//           cards {
//             data {
//               _id
//               title
//               description
//               weight
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const BOARD_BY_USER_QUERY = `
	query boardByUserId($userId: String!) {
    boardByUserId(userId: $userId) {
      data {
        _id
        title
        description
        locked
        columns {
          data {
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
      }
    }
  }`;

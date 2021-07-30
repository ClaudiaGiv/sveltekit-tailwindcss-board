exports.handler = function (event, context, callback) {
  const data = JSON.parse(event.body)
  const { user } = data

  console.log('event', JSON.stringify(event))
  console.log('context', JSON.stringify(context))
  console.log('data', JSON.stringify(data))

  const Role = {
    USER: 'USER',
    ADMIN: 'ADMIN',
  }

  const responseBody = {
    app_metadata: {
      roles: [Role.USER],
      full_name: user.email,
    },
    user_metadata: {
      ...user.user_metadata, // append current user metadata
      full_name: user.email,
    },
  }
  console.log('response', responseBody)
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  })
}

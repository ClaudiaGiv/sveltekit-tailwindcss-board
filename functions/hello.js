exports.handler = async (event, context) => {
	const { identity } = context.clientContext;
	console.log(identity);

	console.log('event', JSON.stringify(event));
	console.log('context', JSON.stringify(context));


	return {
		statusCode: 200,
		body: 'Hello'
	};
};

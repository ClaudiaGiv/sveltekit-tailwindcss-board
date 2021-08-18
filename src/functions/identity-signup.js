exports.handler = function (event, context, callback) {
	const payload = JSON.parse(event.body);
	const userData = payload.user; // Netlify user object

	console.log('event', JSON.stringify(event));
	console.log('context', JSON.stringify(context));
	console.log('userData', JSON.stringify(userData));
};

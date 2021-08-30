<script>
	import fauna from 'faunadb';

	const headers = { 'X-Fauna-Source': 'PersonalKanban' };
	const key = import.meta.env.VITE_FAUNA_API;
	console.log(key);
	const client = new fauna.Client({
		secret: import.meta.env.VITE_FAUNA_SERVER_KEY
	});
	const q = fauna.query;
	const columns = client
		.query(
			q.Map(
				q.Paginate(q.Match(q.Index('allColumns'))),
				q.Lambda((x) => q.Get(x))
			)
		)
		.then((ret) => console.log(ret))
		.catch((err) => console.error('Error: %s', err));

	const users = client
		.query(
			q.Map(
				q.Paginate(q.Match(q.Index('allUsers'))),
				q.Lambda((x) => q.Get(x))
			)
		)
		.then((ret) => console.log(ret))
		.catch((err) => console.error('Error: %s', err));

	const board = client
		.query(q.Get(q.Collection('Board')))
		.then((ret) => console.log(ret))
		.catch((err) => console.error('Error: %s', err));
</script>

<div>
	<p>Heiiii</p>
	<!--	<p>{columns}</p>-->
</div>

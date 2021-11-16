<script>
	import fauna from 'faunadb';
	const key = import.meta.env.VITE_FAUNA_API;
	console.log(key);
	let boardDescription;
	$: boardDescription = '--kanban--';
	let board, column;

	const client = new fauna.Client({
		secret: import.meta.env.VITE_FAUNA_SERVER_KEY
	});
	const q = fauna.query;

	let stream;
	let docRef = q.Ref(q.Collection('Board'), '293327431555613185');

	// async function report(e) {
	// 	console.log('report stream');
	// 	console.log(e);
	// 	let data = 'action' in e ? e['document'].data : e.data;
	// 	document.body.innerHTML +=
	// 		'<p><span class="board">Board: ' + JSON.stringify(data) + '</span></p>';
	// 	await getBoardByUserId();
	// 	console.warn(board.data[0])
	// 	boardDescription = board.data[0].title;
	// 	$: console.log('boardDescription', boardDescription);
	// }
	const startStream = () => {
		console.log('build stream');
		stream = client.stream;
		console.log('stream');
		console.log(stream);
		console.log(JSON.stringify(stream.document(docRef)));
		stream
			.document(docRef)
			.on('snapshot', (snapshot) => {
				console.log('snapshot');
				// report(snapshot);
			})
			.on('start', (start) => {
				console.log('start');
				console.log(start);
			})
			.on('version', (version) => {
				console.log('version');
				console.log(version);
				console.log(version.document.data.description);
				boardDescription = version.document.data.description
				getBoardByUserId();
				// report(version);
			})
			.on('error', (error) => {
				console.log('report stream');
				console.log('Error:', error);
				stream.close();
				setTimeout(startStream, 500);
			})
			.start();
	};
	startStream();

	function fetchColumns() {
		const columns = client
			.query(
				q.Map(
					q.Paginate(q.Match(q.Index('allColumns'))),
					q.Lambda((x) => q.Get(x))
				)
			)
			.then((ret) => console.log(ret))
			.catch((err) => console.error('Error: %s', err));
	}

	function fetchUsers() {
		const users = client
			.query(
				q.Map(
					q.Paginate(q.Documents(q.Collection('User'))),
					q.Lambda((x) => q.Get(x))
				)
			)
			.then((ret) => console.log(ret))
			.catch((err) => console.error('Error: %s', err));
	}

	function fetchBoard() {
		client
			.query(q.Get(q.Collection('Board')))
			.then((ret) => {
				console.log(ret);
				board = ret;
			})
			.catch((err) => console.error('Error: %s', err));
	}

	function getBoardByUserId() {
		client
			.query(q.Call(q.Function('boardByUserId'), ['293327431033422337', 1, 0, 0]))
			.then((ret) => {
				console.log(ret);
				board = ret;
				console.log("get by id")
				console.log(board.data[0].data.description)
				boardDescription = board.data[0].data.description;
			})
			.catch((err) => console.error('Error: %s', err));
	}

	$: console.log("update", board);

	function createColumn() {
		client
			.query(
				q.Create(q.Collection('Column'), {
					data: {
						title: 'New col1',
						weight: 5,
						description: 'sss',
						board: q.Ref(q.Collection('Board'), '293327431555613185')
					}
				})
			)
			.then((ret) => {
				console.log(ret);
				column = ret;
			})
			.catch((err) => console.error('Error: %s', err));
	}

	function updateBoard() {
		client
			.query(
				q.Update(
					q.Ref(q.Collection('Board'), '293327431555613185'),
					// { data: { description: ["kanban111"]} },)) - very permissive => I can put anything as a value
					{ data: { description: 'kanban111' } }
				)
			)
			.then((ret) => console.log(ret))
			.catch((err) => console.error('Error: %s', err));
	}

	function removeLastColumn() {
		client
			.query(q.Delete(q.Ref(q.Collection('Column'), column.ref.value.id)))
			.then((ret) => console.log(ret))
			.catch((err) => console.error('Error: %s', err));
	}

	let value = '123';
	const onInput = (e) => (value = e.target.value);
	$: console.log(value);
</script>

<div>
	<p class="font-semibold p-2 my-3 text-xl bg-teal-100 rounded">
		Choose an action to perform and check the console for results!
	</p>
	<button on:click={createColumn} type="submit" class="bg-indigo-200 rounded p-2"
		>Create column</button
	>
	<button on:click={fetchColumns} type="submit" class="bg-indigo-200 rounded p-2"
		>Fetch columns</button
	>
	<button on:click={fetchUsers} type="submit" class="bg-indigo-200 rounded p-2">Fetch users</button>
	<button on:click={fetchBoard} type="submit" class="bg-indigo-200 rounded p-2">Fetch board</button>
	<button on:click={getBoardByUserId} type="submit" class="bg-indigo-200 rounded p-2"
		>Get board by user</button
	>
	<button on:click={updateBoard} type="submit" class="bg-indigo-200 rounded p-2"
		>Update board</button
	>
	<button on:click={removeLastColumn} type="submit" class="bg-indigo-200 rounded p-2"
		>Remove last created column</button
	>

	<div>
		<input bind:value={boardDescription} />
	</div>

	<div>Description: {boardDescription}</div>
</div>

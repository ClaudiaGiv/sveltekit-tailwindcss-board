<script>
	import { operationStore, query } from '@urql/svelte';

	const board = operationStore(
		`
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
			}`,
		{ userId: '293327431033422337' }
	);
	query(board);
	console.log(board);
	let b;
	$: b =  $board
	console.log(b);
</script>

<div class="flex-1 min-w-0 flex flex-col bg-white mt-4">
	<div class="flex-shrink-0 border-b-2 border-gray-200">
		<header class="px-6">
			<div class="flex justify-between items-center py-3 border-b border-gray-200">
				<div class="border-gray-400">
					<div class="relative w-64">
						<span class="absolute inset-y-0 pl-3 left-0 flex items-center">
							<svg class="mt-1 h-6 w-6 text-gray-500" viewbox="0 0 24 24" fill="none">
								<path
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</span>
						<input
							class="block w-full max-w-xs rounded-md border border-gray-400 w-44 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-600"
							placeholder="Search"
						/>
					</div>
				</div>
				<div>
					<button>
						<svg class="h-6 w-6 text-gray-500" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
							/>
						</svg>
					</button>
					<button class="">
						<div class="flex items-center">
							<img
								class="h-6 w-6 rounded-full"
								src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&h=144&w=144&q=80"
							/>
						</div>
					</button>
				</div>
			</div>
			<div class="ml-6 flex items-center justify-between py-2">
				<div class="flex items-center">
					<h2 class="text-2xl font-semibold text-gray-900 leading-tight">All Issues</h2>
					<div class="ml-6 flex items-center">
						<span class="-ml-2 rounded-full border-2 border-white">
							<img
								class="h-6 w-6 rounded-full object-cover"
								src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&w=144&h=144&q=80"
								alt=""
							/>
						</span>
						<span class="-ml-2 rounded-full border-2 border-white">
							<img
								class="h-6 w-6 rounded-full object-cover"
								src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGltYWdlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=3&w=144&h=144"
								alt=""
							/>
						</span>
						<span class="-ml-2 rounded-full border-2 border-white">
							<img
								class="h-6 w-6 rounded-full object-cover"
								src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&h=144&w=144&q=80"
								alt=""
							/>
						</span>
						<span class="-ml-2 rounded-full border-2 border-white">
							<img
								class="h-6 w-6 rounded-full object-cover"
								src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.25&h=144&w=144&q=80"
								alt=""
							/>
						</span>
					</div>
				</div>
				<div class="flex">
					<span class="inline-flex border bg-gray-200 rounded-md">
						<button class="px-2 py-1 rounded"
							><svg
								class="h-6 w-6 text-gray-600"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg
							></button
						>
						<button class="px-2 py-1 bg-white rounded shadow"
							><svg class="h-6 w-6 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg"
								><path
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
								/></svg
							></button
						>
					</span>
					<button
						class="flex items-center mt-1 ml-5 px-4 py-2 font-medium text-sm text-white bg-gray-800 rounded-md hover:bg-gray-700"
					>
						<svg class="h-5 w-5" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
							><path
								d="M12 4v16m8-8H4"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="ml-1">New Issue</span>
					</button>
				</div>
			</div>
		</header>
	</div>
	{#if $board.fetching}
		Loading columns...
	{:else if $board.error}
		<p>Oh no... {$board.error.message}</p>
	{:else}
		<div class="flex-1 overflow-auto">
			<main class="p-3 inline-flex">
				{#each $board.data.boardByUserId.data[0].columns.data as column}
					<div class="p-3 w-80 bg-gray-100 rounded-md">
						<h3 class="text-sm font-medium text-gray-900">{column.title}</h3>
						<ul class="mt-2">
							{#each column.cards.data as card}
								<li class="block p-5 rounded-md shadow bg-white my-2">
									<a href="#">
										<div class="flex justify-between">
											<p class="text-sm font-medium text-gray-900 leading-snug">
												{card.description}
											</p>
											<span
												><img
													class="h-6 w-6 rounded-full object-cover"
													src="/img/jpg/user1.jpg"
													alt=""
												/></span
											>
										</div>
										<div class="flex justify-between items-baseline">
											<div class="text-sm text-gray-600 mt-2">
												<time datetime="2019-09-14">2019-09-14</time>
											</div>
											<div>
												<span class="px-2 py-1 leading-tight flex items-center bg-red-200">
													<svg class="h-2 w-2 text-teal-500" viewbox="0 0 8 8" fill="currentColor">
														<circle cx="4" cy="4" r="3" />
													</svg>
													<span class="ml-2 text-sm font-medium text-green-900 rounded">Bug</span>
												</span>
											</div>
										</div>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</main>
		</div>
	{/if}
</div>

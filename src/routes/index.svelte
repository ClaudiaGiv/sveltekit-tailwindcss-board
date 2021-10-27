<!--<script context="module">-->
<!--	import board from '../stores/board';-->

<!--	console.log('before load');-->

<!--	function sortBoardElements(board) {-->
<!--		board.columns.data.sort((x, y) => {-->
<!--			return x.weight - y.weight;-->
<!--		});-->
<!--		board.columns.data.forEach((el) =>-->
<!--			el.cards.data.sort((x, y) => {-->
<!--				return x.weight - y.weight;-->
<!--			})-->
<!--		);-->
<!--		return board;-->
<!--	}-->

<!--	export async function load({ page, fetch }) {-->
<!--		const res = await fetch('/api/board1?userId=293327431033422337');-->

<!--		if (res.ok) {-->
<!--			const json = await res.json();-->
<!--			const board1 = await json;-->
<!--			console.log(board1);-->
<!--			board.set(sortBoardElements(board1));-->
<!--			return {};-->
<!--		}-->
<!--		return {-->
<!--			status: res.status,-->
<!--			error: new Error()-->
<!--		};-->
<!--	}-->
<!--</script>-->

<script ✂prettier:content✂="CglpbXBvcnQgeyBvbk1vdW50IH0gZnJvbSAnc3ZlbHRlJzsKCWltcG9ydCBBbGVydCBmcm9tICckbGliL2FsZXJ0LnN2ZWx0ZSc7CglpbXBvcnQgeyBhdXRoIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzL2dvLXRydWUnOwoJaW1wb3J0IHsgZ290byB9IGZyb20gJyRhcHAvbmF2aWdhdGlvbic7CglsZXQgdG9rZW5Db25maXJtYXRpb25FcnJvcjsKCWxldCBzdWNjZXNzTWVzc2FnZTsKCglmdW5jdGlvbiBnZXRUb2tlbihzZXBhcmF0b3IpIHsKCQlyZXR1cm4gd2luZG93LmxvY2F0aW9uLmhyZWYuc3Vic3RyaW5nKDEpLnNwbGl0KHNlcGFyYXRvcilbMV07Cgl9CglmdW5jdGlvbiByZWNvdmVyVXNlckFjY291bnRBZnRlclBhc3N3b3JkUmVzZXQoKSB7CgkJY29uc3QgcmVjb3ZlcnlUb2tlbiA9IGdldFRva2VuKCdyZWNvdmVyeV90b2tlbj0nKTsKCQlpZiAocmVjb3ZlcnlUb2tlbiAhPT0gdW5kZWZpbmVkKSB7CgkJCWF1dGgKCQkJCS5yZWNvdmVyKHJlY292ZXJ5VG9rZW4sIHRydWUpCgkJCQkudGhlbigocmVzcG9uc2UpID0+IHsKCQkJCQljb25zb2xlLmxvZygnTG9nZ2VkIGluIGFzICVzJywgSlNPTi5zdHJpbmdpZnkoeyByZXNwb25zZSB9KSk7CgkJCQkJZ290bygnL3Bhc3N3b3JkLXJlc2V0Jyk7CgkJCQl9KQoJCQkJLmNhdGNoKChlcnJvcikgPT4gewoJCQkJCWNvbnNvbGUubG9nKCdGYWlsZWQgdG8gdmVyaWZ5IHJlY292ZXIgdG9rZW46ICVvJywgZXJyb3IpOwoJCQkJCXRva2VuQ29uZmlybWF0aW9uRXJyb3IgPSAnVGhlIHBhc3N3b3JkIHJlY292ZXJ5IHRva2VuIHdhcyBhbHJlYWR5IHVzZWQhJzsKCQkJCX0pOwoJCX0KCX0KCWZ1bmN0aW9uIGNvbmZpcm1Vc2VyQWZ0ZXJTaWduVXAoKSB7CgkJY29uc3QgY29uZmlybWF0aW9uVG9rZW4gPSBnZXRUb2tlbignY29uZmlybWF0aW9uX3Rva2VuPScpOwoJCWlmIChjb25maXJtYXRpb25Ub2tlbiAhPT0gdW5kZWZpbmVkKSB7CgkJCWF1dGgKCQkJCS5jb25maXJtKGNvbmZpcm1hdGlvblRva2VuKQoJCQkJLnRoZW4oKHJlc3BvbnNlKSA9PiB7CgkJCQkJY29uc29sZS5sb2coJ1VzZXIgaGFzIGJlZW4gY29uZmlybWVkICcsIHJlc3BvbnNlKTsKCQkJCQlzdWNjZXNzTWVzc2FnZSA9ICdZb3VyIGFjY291bnQgaGFzIGJlZW4gY29uZmlybWVkISc7CgkJCQkJLy8gdGhpcy5zYXZlVXNlcihyZXNwb25zZSk7CgkJCQkJZ290bygnL2xvZ2luJyk7CgkJCQl9KQoJCQkJLmNhdGNoKChlcnJvcikgPT4gewoJCQkJCWNvbnNvbGUubG9nKCdBbiBlcnJvciBvY2N1cnJlZCB0cnlpbmcgdG8gY29uZmlybSB0aGUgdXNlciAnLCBlcnJvcik7CgkJCQkJdG9rZW5Db25maXJtYXRpb25FcnJvciA9ICdUaGUgY29uZmlybWF0aW9uIHRva2VuIGZvciBzaWduIHVwIHdhcyBhbHJlYWR5IHVzZWQhJzsKCQkJCX0pOwoJCX0KCX0KCglvbk1vdW50KCgpID0+IHsKCQljb25maXJtVXNlckFmdGVyU2lnblVwKCk7CgkJcmVjb3ZlclVzZXJBY2NvdW50QWZ0ZXJQYXNzd29yZFJlc2V0KCk7Cgl9KTsK">{}</script>

<section>
	<h1>Welcome to SvelteKit</h1>
	<p>
		Visit <a class="text-blue-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read
		the documentation
	</p>
	<!--{#if successMessage}-->
	<Alert message={successMessage} />
	<!--{/if}-->
</section>

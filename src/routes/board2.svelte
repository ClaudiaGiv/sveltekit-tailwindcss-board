<script>
	import { operationStore, query } from '@urql/svelte';

		const columns = operationStore(`
    query getAllColumns {
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
  `);
	query(columns);
</script>

{#if $columns.fetching}
	<p>Loading...</p>
{:else if $columns.error}
	<p>Oh no... {$columns.error.message}</p>
{:else}
	<ul>
		{#each $columns.data.allColumns.data as column}
			<li>{column.title}</li>
		{/each}
	</ul>
{/if}

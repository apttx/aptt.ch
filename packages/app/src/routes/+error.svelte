<script>
  import { dev } from '$app/environment'
  import { page } from '$app/stores'
</script>

<h1>Something went wrong</h1>

{#if dev}
  <p>{$page.error?.message}</p>
{/if}

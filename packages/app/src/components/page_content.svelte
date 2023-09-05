<script>
  import Rich_Text from './rich_text.svelte'

  /** @type {Page_Content[]} */
  export let content
</script>

{#each content as content_element}
  {#if content_element.type === 'heading'}
    {@const element = `h${content_element.level}`}
    <svelte:element this={element}>
      <Rich_Text content={content_element.children} />
    </svelte:element>
  {:else if content_element.type === 'paragraph'}
    <p>
      <Rich_Text content={content_element.children} />
    </p>
  {/if}
{/each}

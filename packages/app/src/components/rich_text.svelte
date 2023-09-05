<script>
  /** @type {Rich_Text[]} */
  export let content
</script>

{#each content as content_element}
  {#if content_element.type === 'text'}
    {content_element.text}
  {:else if content_element.type === 'anchor'}
    <a
      href={content_element.href}
      rel={content_element.rel}
      target={content_element.target}
    >
      {content_element.text}
    </a>
  {/if}
{/each}

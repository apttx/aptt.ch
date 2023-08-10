<script>
  import Maximize from '~icons/ph/arrows-out-simple-bold'

  /** @type {string} */
  export let title
  /** @type {string} */
  export let screenshot_url
  /** @type {string | undefined} */
  export let url = undefined
</script>

<figure class="browser_window">
  <figcaption class="browser_tab">
    {title}
  </figcaption>

  <picture class="browser_page">
    <img
      src={screenshot_url}
      alt="Screenshot"
    />
  </picture>

  <!-- visual browser window buttons, not relevant to a11y -->
  {#if url}
    <a
      class="browser_button browser_maximize"
      href={url}
      target="_blank"
      rel="noreferrer,nofollow"
      title="Visit this project"
    >
      <Maximize aria-label="Visit {title}" />
    </a>
  {/if}
</figure>

<style>
  .browser_window {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'tab maximize'
      'page page';
    box-shadow: 0 0.5rem 2rem #00000044;
    border-radius: 0.5rem;
    background-color: #ddddee;
    overflow: hidden;
    color: #9999aa;
  }

  .browser_tab {
    grid-area: tab;
    align-self: center;
    justify-self: start;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    background-color: #9999aa;
    padding: 0.5rem 1rem;
    color: white;
  }

  .browser_maximize {
    grid-area: maximize;
    padding-inline: 0.75rem;
    padding-block: 0.5rem;
  }

  picture,
  img {
    display: block;
    width: 100%;
  }

  .browser_page {
    grid-area: page;
    justify-self: stretch;
  }
</style>

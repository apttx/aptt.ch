<script>
  import Minimize from '~icons/ph/minus-bold'
  import Maximize from '~icons/ph/arrows-out-simple-bold'
  import Close from '~icons/ph/x-bold'

  /** @type {string} */
  export let title
  /** @type {string} */
  export let screenshot_url
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
  <span
    class="browser_button browser_minimize"
    aria-hidden="true"
  >
    <Minimize />
  </span>
  <span
    class="browser_button browser_maximize"
    aria-hidden="true"
  >
    <Maximize />
  </span>
  <span
    class="browser_button browser_close"
    aria-hidden="true"
  >
    <Close />
  </span>
</figure>

<style>
  .browser_window {
    display: grid;
    grid-template-columns: 1fr repeat(3, auto);
    grid-template-areas:
      'tab minimize maximize close'
      'page page page page';
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

  .browser_button {
    padding-inline: 0.5rem;
    padding-block: 0.5rem;
  }

  .browser_minimize {
    grid-area: minimize;
  }

  .browser_maximize {
    grid-area: maximize;
  }

  .browser_close {
    grid-area: close;
    padding-right: 0.5rem;
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

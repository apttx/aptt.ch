<script>
  import Recede from '~icons/ph/caret-left-bold'
  import Advance from '~icons/ph/caret-right-bold'

  import { carousel } from '$utilities/carousel.mjs'

  import Browser_Window from '$components/browser_window.svelte'

  /** @type {Pick<Project, 'title' | 'description' | 'url' | 'thumbnail'>[]} */
  export let projects

  const { active_index, can_recede, recede, can_advance, advance, action } = carousel()
</script>

<div
  role="presentation"
  class="carousel"
>
  <button
    on:click={() => {
      recede()
    }}
    disabled={!$can_recede}
    class="carousel_button carousel_recede_button"
  >
    <Recede aria-label="Backwards" />
  </button>
  <button
    on:click={() => {
      advance()
    }}
    disabled={!$can_advance}
    class="carousel_button carousel_advance_button"
  >
    <Advance aria-label="Forwards" />
  </button>

  <ul
    use:action
    class="carousel_slider"
    style="position:relative"
  >
    {#each projects as project, project_index}
      <li
        class="project"
        class:inactive={project_index !== $active_index}
      >
        <span class="project_title">
          {project.title}
        </span>

        <p class="project_description">{project.description}</p>

        <div
          role="presentation"
          class="project_browser_window"
        >
          <Browser_Window
            title={project.title}
            screenshot_url={project.thumbnail.url}
            url={project.url}
          />
        </div>
      </li>
    {/each}
  </ul>
</div>

<style>
  .carousel {
    --padding: var(--margin_content_layout);

    display: grid;
    position: relative;
    grid-template-rows: 1;
    grid-template-columns:
      max(3.5rem + var(--margin_content_minimum), var(--padding))
      1fr
      max(3.5rem + var(--margin_content_minimum), var(--padding));
    justify-content: center;
    align-items: center;
  }

  .carousel_button {
    display: grid;
    align-content: center;
    justify-content: center;
    z-index: 1;
    padding: 1rem;
    width: 3.5rem;
    height: 3.5rem;
    transition-property: opacity;
    transition-duration: 150ms;
    transition-timing-function: var(--easing_cubic_in);
  }

  .carousel_button:disabled {
    transition-timing-function: var(--easing_cubic_out);
    opacity: 0.25;
  }

  @media (pointer: coarse) {
    .carousel_button {
      visibility: hidden;
    }
  }

  .carousel_recede_button {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    justify-self: end;
  }

  .carousel_advance_button {
    grid-row: 1 / 2;
    grid-column: 3 / 4;
    justify-self: start;
  }

  .carousel_slider {
    -ms-overflow-style: none;
    display: grid;
    grid-auto-columns: 100%;
    grid-auto-flow: column;
    grid-row: 1 / 2;
    grid-column: 1 / 4;
    z-index: 0;
    padding-inline: var(--padding);
    overflow: scroll visible;
    scroll-padding-inline: var(--padding);
    scroll-snap-stop: always;
    scroll-snap-type: both mandatory;
    scrollbar-width: none;
  }

  .project {
    display: grid;
    grid-template-rows: auto 1fr auto;
    opacity: 1;
    transition-duration: 400ms;
    transition-property: opacity, transform;
    transition-timing-function: var(--easing_cubic_out);
    scroll-snap-align: center;
  }

  .project.inactive {
    transform: scale(0.85);
    opacity: 0.25;
    transition-timing-function: var(--easing_cubic_in);
  }

  .project_title {
    display: block;
    margin-inline: var(--margin_content_text-nested);
    font-weight: 800;
    font-size: 1.125rem;
  }

  .project_description {
    margin-inline: var(--margin_content_text-nested);
  }

  .project_browser_window {
    margin-block: 2rem;
  }
</style>

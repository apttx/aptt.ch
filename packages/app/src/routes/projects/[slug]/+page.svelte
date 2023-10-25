<script>
  import { onDestroy } from 'svelte'
  import { fly } from 'svelte/transition'

  import { get_force_simulation } from '$utilities/simulation.mjs'

  import Visit from '~icons/ph/arrow-square-out-bold'
  import Graph from '$components/graph.svelte'
  import Page_Content from '$components/page_content.svelte'
  import Page from '$components/page.svelte'
  import { receive, send } from '../../transition.mjs'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import { duration } from '$transitions/page.mjs'

  export let data

  let scroll = 0
  /** @type {(event: UIEvent & { currentTarget: Window }) => void} */
  const on_scroll = (event) => {
    scroll = event.currentTarget.scrollY
  }

  let nodes = data.project.technologies
    .filter(
      /** @type {(technology: any) => technology is Technology | Technology_Group} */ (
        technology,
      ) => !('connector' in technology),
    )
    .map((technology) =>
      'technologies' in technology
        ? { ...technology.technologies[0], id: technology.technologies[0].name }
        : { ...technology, id: technology?.name },
    )
  let edges = data.project.technologies
    .filter(
      /** @type {(technology: any) => technology is Technology_Connection} */ (technology) =>
        'source' in technology && 'target' in technology,
    )
    .map((technology) => ({
      ...technology,
      source: technology.source.name,
      target: technology.target.name,
    }))
  const simulation = get_force_simulation({ edges, nodes })

  simulation.on('tick', () => {
    nodes = nodes
    edges = edges
  })

  onDestroy(() => {
    simulation.stop()
  })
</script>

<svelte:window on:scroll={on_scroll} />

<img
  in:receive={{ key: 'project_thumbnail' }}
  out:send={{ key: 'project_thumbnail' }}
  src="/images/banner.jpg"
  alt=""
/>

<Page>
  <div
    role="presentation"
    class="hero"
    style:--scroll={scroll}
  >
    <div
      aria-hidden="true"
      role="presentation"
      class="intro content_card"
      in:fly={{ y: 200, opacity: 0, duration: duration, easing: cubicOut }}
      out:fly={{ y: 200, opacity: 0, duration: duration, easing: cubicIn }}
    >
      <h1 class="title">
        {data.project.title}
      </h1>

      <a
        title="Visit this project"
        href={data.project.url}
        target="_blank"
        rel="noreferrer nofollow"
        class="link"
      >
        <Visit aria-label="Visit" />
      </a>

      <p class="description">{data.project.description}</p>
    </div>

    <div
      role="presentation"
      class="page_content content_card"
    >
      <Page_Content content={data.project.content} />
    </div>

    {#if data.project.thumbnail}
      <figure class="thumbnail">
        <picture>
          <img
            src={data.project.thumbnail.url}
            alt={data.project.title}
          />
        </picture>
      </figure>
    {/if}
  </div>

  <Graph
    {nodes}
    {edges}
  />
</Page>

<style>
  .hero {
    display: grid;
    grid-template-rows: 100vh auto auto;
    grid-template-columns: 1fr;
  }

  .thumbnail {
    display: grid;
    grid-row: 1 / 3;
    grid-column: 1;
    justify-content: center;
    align-items: stretch;
    transform: translateY(calc(0.2px * var(--scroll)));
    z-index: 0;
    overflow: hidden;
  }

  .thumbnail picture,
  .thumbnail img {
    justify-content: stretch;
    max-width: unset;
  }

  .content_card {
    --padding_inline: 3rem;

    margin-inline: calc(var(--margin_content_text) - var(--padding_inline));
    background-color: white;
    padding: 2.5rem var(--padding_inline);
  }

  .intro {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'title link'
      'description description';
    grid-row: 1;
    grid-column: 1;
    align-items: center;
    align-self: end;
    z-index: 2;
    box-shadow: 0 0 5rem #00000011, 0 -2rem 3rem 1rem #00000009;
  }

  .title {
    grid-area: title;
    font-weight: 800;
    font-size: 1.5rem;
  }

  .link {
    display: block;
    grid-area: link;
    width: 1.5rem;
    height: 1.5rem;
  }
  .link :global(svg) {
    width: 100%;
    height: 100%;
  }

  .description {
    grid-area: description;
    grid-row: 2;
    grid-column: 1;
    z-index: 2;
    margin-top: 1rem;
  }

  .page_content {
    grid-row: 3;
    grid-column: 1;
    z-index: 3;
  }

  .page_content :global(p) {
    margin-top: 1rem;
    line-height: 1.75;
  }

  .page_content :global(a) {
    font-weight: 600;
    text-decoration: underline;
    text-decoration-thickness: 0.1rem;
    text-underline-offset: 0.15em;
  }
</style>

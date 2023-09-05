<script>
  import { onDestroy, onMount } from 'svelte'

  import { get_force_simulation } from '$utilities/simulation.mjs'

  import Graph from '$components/graph.svelte'

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

<div
  role="presentation"
  class="hero"
  style:--scroll={scroll}
>
  <div
    role="presentation"
    class="intro"
  >
    <h1 class="title">
      {data.project.title}
    </h1>

    <p class="description">{data.project.description}</p>
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

<style>
  .hero {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;
    width: 100vw;
    height: 100vh;
  }

  .thumbnail {
    grid-row: 1 / 2;
    grid-column: 1;
    transform: translateY(calc(0.2px * var(--scroll)));
    z-index: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .intro {
    --padding_inline: 3rem;

    grid-row: 1;
    grid-column: 1;
    align-self: end;
    z-index: 1;
    margin-inline: calc(var(--margin_content_text) - var(--padding_inline));
    box-shadow: 0 0.25rem 0.5rem #00000033;
    background-color: white;
    padding: 2.5rem var(--padding_inline);
  }

  .title {
    font-weight: 800;
    font-size: 1.5rem;
  }

  .description {
    grid-row: 2;
    grid-column: 1;
    margin-top: 1rem;
  }
</style>

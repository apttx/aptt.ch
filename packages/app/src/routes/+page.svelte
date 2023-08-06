<script>
  import Browser_Window from '$components/browser_window.svelte'
  import Graph from '$components/graph.svelte'
  import { get_force_simulation } from '$utilities/simulation.mjs'

  export let data
</script>

<h1>aptt</h1>

<h2>about me</h2>

<h2>stuff i've worked with</h2>

<ul class="technology_list">
  {#each data.technologies as technology}
    <li class="technology_list_item">
      <span>{technology.name}</span>

      {#if technology.icon}
        <img
          src={technology.icon}
          alt="{technology.name} logo"
          class="technology_icon"
        />
      {/if}
    </li>
  {/each}
</ul>

<h2>stuff i've worked on</h2>

{#each data.projects as project}
  <h3>{project.title}</h3>

  <p>{project.description}</p>

  <div
    role="presentation"
    class="project_browser_window"
  >
    <Browser_Window
      title={project.title}
      screenshot_url={project.thumbnail.url}
    />
  </div>

  {@const nodes = project.technologies
    .filter((technology) => !('connector' in technology))
    .map((technology) =>
      'technologies' in technology
        ? { ...technology.technologies[0], id: technology.technologies[0].name }
        : { ...technology, id: technology?.name },
    )}
  {@const edges = project.technologies
    .filter((technology) => 'connector' in technology)
    .map((technology) => ({
      ...technology,
      source: technology.source?.name,
      target: technology.target?.name,
    }))}
  {@const simulation = get_force_simulation({ edges, nodes })}
  {@const _ = simulation.tick(100)}

  <div
    role="presentation"
    class="project_graph"
  >
    <Graph
      {edges}
      {nodes}
    />
  </div>
{/each}

<style>
  .technology_list {
    display: grid;
    grid-auto-flow: column;
    margin-inline: var(--margin_content_layout);
    margin-block: 4rem;
  }

  .technology_list_item {
    display: grid;
    gap: 1rem;
  }

  .technology_icon {
    width: auto;
    height: 4rem;
  }

  .project_browser_window {
    margin-inline: var(--margin_content_layout);
    margin-block: 2rem;
  }

  .project_graph {
    margin-inline: var(--margin_content_page);
  }

  p {
    margin-inline: var(--margin_content_text);
  }

  h1,
  h2,
  h3 {
    margin-inline: var(--margin_content_text);
  }

  h1,
  h2,
  h3 {
    font-weight: 800;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  h3 {
    font-size: 1.125rem;
  }
</style>

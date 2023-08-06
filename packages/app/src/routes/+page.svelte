<script>
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

  <img
    src={project.thumbnail.url}
    alt="{project.title} screenshot"
    class="project_thumbnail"
  />

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

  <Graph
    {edges}
    {nodes}
  />
{/each}

<style>
  .technology_list {
    display: grid;
    grid-auto-flow: column;
  }

  .technology_list_item {
    display: grid;
    gap: 1rem;
  }

  .technology_icon {
    width: auto;
    height: 4rem;
  }

  .project_thumbnail {
    display: block;
    margin-inline: 2rem;
    box-shadow: 0 0.5rem 2rem #00000044;
    border-radius: 0.5rem;
    width: calc(100% - 4rem);
  }
</style>

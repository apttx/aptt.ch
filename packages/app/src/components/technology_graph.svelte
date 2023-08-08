<script>
  import Graph from './graph.svelte'

  import { get_force_simulation } from '$utilities/simulation.mjs'

  /** @type {Technology[]} */
  export let technologies = []

  /** @type {Simulation_Node[]} */
  let nodes = [
    { id: 'aptt', fx: 0, fy: 0 },
    ...technologies.map((technology) => ({ ...technology, id: technology?.name })),
  ]
  /** @type {Simulation_Edge[]} */
  let edges = technologies.map((technology) => ({
    source: 'aptt',
    target: technology.name,
  }))

  /** @type {'enjoyment' | 'familiarity'} */
  let visualize_by = 'enjoyment'

  /** @type {(edge: Simulation_Edge) => number} */
  const dynamic_distanceee = (edge) => {
    // source is fixed center node, target is technology
    const target_node = edge.target

    const distance = (1 - target_node[visualize_by]) * 200 + 50

    if (isNaN(distance)) {
      return 300
    }

    return distance
  }

  const get_technology_graph_force_simulation = () => {
    const simulation = get_force_simulation({
      edges,
      nodes,
      distance: dynamic_distanceee,
    })

    simulation.alphaTarget(0.5)
    // force an update
    simulation.on('tick', () => {
      nodes = nodes
      edges = edges
    })

    return simulation
  }

  let simulation = get_technology_graph_force_simulation()

  const restart = () => {
    simulation?.stop()

    simulation = get_technology_graph_force_simulation()
  }
</script>

<Graph
  {edges}
  {nodes}
  node_icon_size={40}
/>

<form on:submit|preventDefault>
  <fieldset>
    <legend>Visualize</legend>

    <label>
      <span>Enjoyment</span>
      <input
        type="radio"
        name="visualize_by"
        value="enjoyment"
        checked={visualize_by === 'enjoyment'}
        on:input={() => {
          visualize_by = 'enjoyment'
          restart()
        }}
      />
    </label>
  </fieldset>

  <label>
    <span>Familiarity</span>
    <input
      type="radio"
      name="visualize_by"
      value="familiarity"
      checked={visualize_by === 'familiarity'}
      on:input={() => {
        visualize_by = 'familiarity'
        restart()
      }}
    />
  </label>
</form>

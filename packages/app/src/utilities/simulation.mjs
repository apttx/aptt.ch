import { forceSimulation, forceLink, forceManyBody, forceX, forceY } from 'd3'

/**
 * @typedef {{
 *   id: string
 * } & import('d3').SimulationNodeDatum} Identifiable_Node
 */

/** @type {typeof forceLink<Simulation_Node, { source: string; target: string }>} */
const retypedForceLink = forceLink

/**
 * @type {typeof forceSimulation<
 *   { id: string } & ,
 *   { source: string; target: string }
 * >}
 */
const retypedForceSimulation = forceSimulation

/** @type {(basic_node: { id: string }) => Simulation_Node} */
export const get_simulation_node = (basic_node) => ({ ...basic_node, x: 0, y: 0 })

/** @type {(basic_edge: { source: string; target: string }) => Simulation_Edge} */
export const get_simulation_edge = (basic_edge) => ({
  source: { id: basic_edge.source, x: 0, y: 0 },
  target: { id: basic_edge.target, x: 0, y: 0 },
})

/**
 * Create a d3 force simulation with the given nodes & edges, in place
 *
 * @type {<Node extends { id: string } = never>(options: {
 *   nodes: Node[]
 *   edges: { source: Node['id']; target: Node['id'] }[]
 * }) => import('d3').Simulation<Simulation_Node, Simulation_Edge>}
 */
export const get_force_simulation = (options) => {
  const { nodes, edges } = options

  const link_force = retypedForceLink(edges)
    .distance(() => 200)
    .id((node) => node.id)
  const charge_force = forceManyBody().strength(-1000)
  const simulation = retypedForceSimulation(nodes)
    .force('link', link_force)
    .force('charge', charge_force)
    .force('x', forceX())
    .force('y', forceY())

  return simulation
}

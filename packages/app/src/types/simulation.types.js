/**
 * Custom type for simulation nodes
 *
 * @typedef {{ id: string } & import('d3').SimulationNodeDatum} Simulation_Node
 */

/**
 * Custom convenience-type for simulation links
 *
 * Overrides the convenience-typed source & target to what they will be after simulation
 * initialisation.
 *
 * @typedef {import('d3').SimulationLinkDatum<Simulation_Node> & {
 *   source: Simulation_Node
 *   target: Simulation_Node
 * }} Simulation_Edge
 */

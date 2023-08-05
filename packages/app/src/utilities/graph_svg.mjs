/**
 * @type {<Node extends Simulation_Node>(
 *   node: Node,
 * ) => {
 *   id: string
 *   props: { cx: number; cy: number }
 *   node: Node
 * }}
 */
export const get_circle = (node) => {
  const cx = node.x ?? 0
  const cy = node.y ?? 0
  const id = node.id

  const props = {
    cx,
    cy,
  }

  const circle = {
    id,
    props,
    node,
  }

  return circle
}

/**
 * @type {<Edge extends Simulation_Edge = never>(
 *   edge: Edge,
 * ) => {
 *   props: {
 *     x1: number
 *     y1: number
 *     x2: number
 *     y2: number
 *   }
 *   center: {
 *     x: number
 *     y: number
 *   }
 *   edge: Edge
 * }}
 */
export const get_line = (edge) => {
  const x1 = edge.source?.x ?? 0
  const y1 = edge.source?.y ?? 0
  const x2 = edge.target?.x ?? 100
  const y2 = edge.target?.y ?? 100

  const props = {
    x1,
    y1,
    x2,
    y2,
  }

  const x = x1 + (x2 - x1) / 2
  const y = y1 + (y2 - y1) / 2
  const center = {
    x,
    y,
  }

  const line = {
    props,
    edge,
    center,
  }

  return line
}

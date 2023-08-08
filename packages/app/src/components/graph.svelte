<script>
  import { get_circle, get_line } from '$utilities/graph_svg.mjs'

  /** @type {Simulation_Node[]} */
  export let nodes = []
  /** @type {Simulation_Edge[]} */
  export let edges = []
  /** @type {number} */
  export let node_icon_size = 40
  /** @type {number} */
  export let edge_icon_size = 30
  /** @type {number} */
  export let width = 500
  /** @type {number} */
  export let height = 500

  $: lines = edges.map((link) => get_line(link))
  $: circles = nodes.map((node) => get_circle(node))
</script>

<svg
  {width}
  {height}
  viewBox="{-width / 2} {-height / 2} {width} {height}"
>
  <g>
    {#each lines as line}
      <line
        class="edge_line"
        {...line.props}
        stroke-width="3"
        stroke="black"
      />

      {#if line.edge.connector}
        <image
          href={line.edge.connector.icon}
          width={edge_icon_size}
          height={edge_icon_size}
          x={line.center.x - edge_icon_size / 2}
          y={line.center.y - edge_icon_size / 2}
          style:--center-x="{line.center.x}px"
          style:--center-y="{line.center.y}px"
          class="edge_image"
        />
      {/if}
    {/each}
  </g>
  <g>
    {#each circles as circle (circle.id)}
      <image
        href={circle.node.icon}
        width={node_icon_size}
        height={node_icon_size}
        x={circle.props.cx - node_icon_size / 2}
        y={circle.props.cy - node_icon_size / 2}
        style:--center-x="{circle.props.cx}px"
        style:--center-y="{circle.props.cy}px"
        class="node_image"
      />
    {/each}
  </g>
</svg>

<style>
  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  line {
    pointer-events: none;
  }

  .node_image,
  .edge_image {
    transform-origin: var(--center-x) var(--center-y);
    transition-duration: 150ms;
    transition-property: transform;
    transition-timing-function: ease-out;
    cursor: pointer;
    border-radius: 2px;
    background-color: white;
  }
</style>

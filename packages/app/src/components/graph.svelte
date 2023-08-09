<script>
  import { get_circle, get_line } from '$utilities/graph_svg.mjs'
  import { createEventDispatcher } from 'svelte'

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

  /**
   * @type {import('svelte').EventDispatcher<{
   *   node_dragstart: { x: number; y: number }
   *   node_drag: { x: number; y: number }
   *   node_dragend: { x: number; y: number }
   *   node_click: Simulation_Node
   * }>}
   */
  const dispatch = createEventDispatcher()

  // `dragstart`'s default behaviour has the svg move with the mouse. preventing default prevents `drag` events from firing for some reason.
  /** @type {boolean} */
  let mouse_pressed = false
  /** @type {SVGElement} */
  let svg_element

  /** @type {(event: MouseEvent) => { x: number; y: number }} */
  const get_svg_coordinates = (event) => {
    const svg_rect = svg_element.getBoundingClientRect()

    const { top, left, bottom, right } = svg_rect

    const x = (((event.x - left - right + event.x) / svg_rect.width) * width) / 2
    const y = (((event.y - top - bottom + event.y) / svg_rect.height) * height) / 2

    const coordinates = { x, y }

    return coordinates
  }
</script>

<svelte:window
  on:mousedown={(event) => {
    mouse_pressed = true

    const event_detail = get_svg_coordinates(event)

    dispatch('node_dragstart', event_detail)
  }}
  on:mousemove={(event) => {
    if (!mouse_pressed) {
      return
    }

    const event_detail = get_svg_coordinates(event)

    dispatch('node_drag', event_detail)
  }}
  on:mouseup={(event) => {
    mouse_pressed = false

    const event_detail = get_svg_coordinates(event)

    dispatch('node_dragend', event_detail)
  }}
/>

<svg
  bind:this={svg_element}
  {width}
  {height}
  viewBox="{-width / 2} {-height / 2} {width} {height}"
  role="toolbar"
  tabindex="0"
  on:dragstart|preventDefault
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
        role="button"
        tabindex="0"
        on:click={() => {
          dispatch('node_click', circle.node)
        }}
        on:keydown={() => {
          dispatch('node_click', circle.node)
        }}
      />
    {/each}
  </g>
</svg>

<style>
  svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
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

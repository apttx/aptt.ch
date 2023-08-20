import { dev } from '$app/environment'
import { derived, get, readonly, writable } from 'svelte/store'

/** @type {(element: HTMLElement) => number} */
const get_left_padding = (element) => {
  const computed_style = getComputedStyle(element)
  const left_padding_string = computed_style.paddingLeft
  const left_padding_string_without_px = left_padding_string.replace('px', '')
  const left_padding_number = parseInt(left_padding_string_without_px)

  return left_padding_number
}

/** @type {(element: HTMLElement, points: { left: number; right: number }) => boolean} */
const has_center_between = (element, options) => {
  const { left, right } = options

  const center_of_element = element.offsetLeft + element.offsetWidth / 2

  // element is off to the left of the visible portion
  if (center_of_element < left) {
    return false
  }
  // element is off to the right
  if (right < center_of_element) {
    return false
  }

  // element is in the visible portion
  return true
}

export const carousel = () => {
  /** @type {import('svelte/store').Writable<number>} */
  const active_index = writable(0)
  /** @type {import('svelte/store').Writable<number>} */
  const maximum_index = writable(0)
  /** @type {import('svelte/store').Writable<HTMLElement | undefined>} */
  const carousel_container = writable(undefined)

  const advance = () => {
    const carousel_container_value = get(carousel_container)

    if (!carousel_container_value) {
      if (dev) {
        console.warn(
          '[carousel.mjs] there is no carousel container element. did you use the action?',
        )
      }
      return
    }

    const active_index_value = get(active_index)
    const maximum_index_value = get(maximum_index)
    const next_index = Math.min(maximum_index_value, active_index_value + 1)
    const next_child = /** @type {HTMLElement} */ (carousel_container_value.children[next_index])

    const left_container_padding = get_left_padding(carousel_container_value)
    const left = next_child.offsetLeft - left_container_padding

    carousel_container_value.scrollTo({ left, behavior: 'smooth' })
  }

  const recede = () => {
    const carousel_container_value = get(carousel_container)

    if (!carousel_container_value) {
      if (dev) {
        console.warn(
          '[carousel.mjs] there is no carousel container element. did you use the action?',
        )
      }
      return
    }

    const active_index_value = get(active_index)
    const next_index = Math.max(0, active_index_value - 1)
    const next_child = /** @type {HTMLElement} */ (carousel_container_value.children[next_index])

    const left_container_padding_number = get_left_padding(carousel_container_value)
    const left = next_child.offsetLeft - left_container_padding_number

    carousel_container_value.scrollTo({ left, behavior: 'smooth' })
  }

  /** @type {(event: Event) => void} */
  const on_scroll = (event) => {
    if (!(event.target instanceof HTMLElement)) {
      return
    }
    const carousel_container_value = event.target

    const left_container_padding_number = get_left_padding(carousel_container_value)

    // left side of visible portion of scroll container
    const left = left_container_padding_number + event.target.scrollLeft
    // right side of visible portion of scroll container
    const right = left + event.target.offsetWidth

    const children = /** @type {HTMLElement[]} */ (Array.from(event.target.children))
    // find the child whose center is in the visible portion of the scroll container
    const child_matching_scroll_position = children.find((element) =>
      has_center_between(element, { left, right }),
    )

    // can't continue without children in the area (=extreme scroll position)
    if (!child_matching_scroll_position) {
      return
    }

    // this index is always > 0, because the child we found earlier always exists in the array
    const index = children.indexOf(child_matching_scroll_position)

    active_index.set(index)
  }

  /** @type {import('svelte/action').Action<HTMLElement>} */
  const action = (element) => {
    carousel_container.set(element)
    maximum_index.set(element.children.length - 1)

    element.addEventListener('scroll', on_scroll)

    const destroy = () => {
      carousel_container.set(undefined)

      element.removeEventListener('scroll', on_scroll)
    }

    const result = {
      destroy,
    }

    return result
  }

  const can_recede = derived(active_index, (active_index) => active_index > 0)
  const can_advance = derived(
    [active_index, maximum_index],
    ([active_index, maximum_index]) => active_index < maximum_index,
  )
  const readonly_active_index = readonly(active_index)

  return {
    action,
    active_index: readonly_active_index,
    can_advance,
    advance,
    can_recede,
    recede,
  }
}

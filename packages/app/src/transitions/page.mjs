export const duration = 200

/**
 * @type {(
 *   element: HTMLElement,
 *   options?: {
 *     duration?: number
 *     delay?: number
 *     easing?: import('svelte/transition').EasingFunction
 *   },
 * ) => import('svelte/transition').TransitionConfig}
 */
export const page_out = (_, options) => {
  return {
    ...options,
    css: (t) => {
      const scroll_top = document.scrollingElement?.scrollTop ?? 0

      const css = `
        top: ${-scroll_top}px;
        position: absolute;
        opacity: ${t}
        z-index: -1;
      `

      return css
    },
    tick: (t) => {
      _.style.setProperty('--page_opacity', String(t))
    },
  }
}

/**
 * @type {(
 *   element: Element,
 *   options?: {
 *     duration?: number
 *     delay?: number
 *     easing?: import('svelte/transition').EasingFunction
 *   },
 * ) => import('svelte/transition').TransitionConfig}
 */
export const page_in = (_, options) => {
  return {
    ...options,
    css: (t) => {
      const css = `
        opacity: ${t};
      `

      return css
    },
  }
}

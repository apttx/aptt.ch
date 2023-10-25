import { cubicOut } from 'svelte/easing'
import { crossfade } from 'svelte/transition'

import { duration as page_transition_duration } from '$transitions/page.mjs'

export const [send, receive] = crossfade({
  duration: page_transition_duration * 2,
  easing: cubicOut,
})

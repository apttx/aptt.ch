<script>
  import { cubicIn, cubicOut } from 'svelte/easing'

  import { page_in, page_out, duration } from '$transitions/page.mjs'
</script>

<div
  role="presentation"
  class="colored_base"
  out:page_out={{ duration: duration / 2, easing: cubicOut }}
  in:page_in={{ duration: duration / 2, easing: cubicIn }}
>
  <slot />
</div>

<script>
  import '@unocss/reset/tailwind.css'

  import '@fontsource/manrope/400.css'
  import '@fontsource/manrope/600.css'
  import '@fontsource/manrope/800.css'

  import '$css/colors.variables.css'
  import '$css/content_margin.variables.css'

  import '$css/document.css'
  import '$css/svg.css'

  import { onNavigate } from '$app/navigation'

  onNavigate((navigation) => {
    if (!('startViewTransition' in document)) {
      return
    }

    const nextDocument =
      /** @type {Document & { startViewTransition: (callback: () => Promise<void>) => void }} */ (
        document
      )

    const view_transition = new Promise((resolve) => {
      nextDocument.startViewTransition(async () => {
        // resolve when the transition starts
        resolve(undefined)

        // keep the transition running until navigation completes
        await navigation.complete
      })
    })

    return view_transition
  })
</script>

<slot />

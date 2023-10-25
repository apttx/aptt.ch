<script>
  import Page from '$components/page.svelte'

  import { receive, send } from '../../transition.mjs'
</script>

<Page>
  <img
    in:receive={{ key: 'project_thumbnail' }}
    out:send={{ key: 'project_thumbnail' }}
    src="/images/banner.jpg"
    alt="banner"
  />

  test2

  <a href="/test">to test</a>
  <a href="/projects/cantonese-dictionary">to cd</a>
</Page>

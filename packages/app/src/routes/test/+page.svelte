<script>
  import Page from '$components/page.svelte'

  import { receive, send } from '../transition.mjs'
</script>

<Page>
  test

  <a href="/test/test">to test 2</a>
  <a href="/projects/cantonese-dictionary">to cd</a>

  <img
    in:receive={{ key: 'project_thumbnail' }}
    out:send={{ key: 'project_thumbnail' }}
    src="/images/banner.jpg"
    alt="banner"
  />
</Page>

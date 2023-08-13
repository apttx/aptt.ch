<script>
  import { page } from '$app/stores'

  $: access_token = $page.url.searchParams.get('access_token')
</script>

<h1>Login</h1>

<p>
  This website uses cookies to save login information in order to display confidential information.
</p>

<form
  method="post"
  action="?/login"
>
  <label class="storage_agreement">
    <input
      type="checkbox"
      name="storage_agreement"
      required
    />
    <span>I, the user, allow storage of this login information within a cookie</span>
  </label>

  <label class="non_disclosure_agreement">
    <input
      type="checkbox"
      name="non_disclosure_agreement"
      required
    />
    <span>
      I, the user, agree not to disclose confidential information displayed only after visiting this
      page
    </span>
  </label>

  <button
    type="submit"
    class="submit_button"
  >
    Continue
  </button>

  <a
    href="/"
    class="back_link"
  >
    No, please take me back
  </a>

  <input
    type="text"
    name="access_token"
    aria-hidden="true"
    readonly
    value={access_token}
    class="access_token"
  />
</form>

<style>
  h1 {
    margin-top: 4rem;
    margin-inline: var(--margin_content_text);
    font-weight: 800;
    font-size: 1.25rem;
  }

  p {
    margin-top: 2rem;
    margin-inline: var(--margin_content_text);
  }

  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'storage storage'
      'disclosure disclosure'
      'back continue';
    justify-items: start;
    margin-top: 2rem;
    margin-inline: var(--margin_content_text);
  }

  .storage_agreement {
    grid-area: storage;
  }

  .non_disclosure_agreement {
    grid-area: disclosure;
    margin-top: 1rem;
  }

  .submit_button {
    grid-area: continue;
    justify-self: end;
    margin-top: 2rem;
  }

  .back_link {
    grid-area: back;
    margin-top: 2rem;
  }

  .access_token {
    display: none;
  }
</style>

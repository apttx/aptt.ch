<script>
  import Page_Content from '$components/page_content.svelte'

  export let data
</script>

<h1 class="text_content">{data.recipe.title}</h1>

<p class="description text_content">{data.recipe.description}</p>

<h2 class="ingredients_heading text_content">Ingredients</h2>

<ul class="ingredients_list text_content">
  {#each data.recipe.ingredients as ingredient}
    <li>{ingredient.quantity.number}{ingredient.quantity.unit.symbol} {ingredient.name}</li>
  {/each}
</ul>

<h2 class="text_content">Steps</h2>

<ol class="steps text_content">
  {#each data.recipe.steps as step}
    <li class="step">
      <span class="step_title">
        {step.title}
      </span>

      {#if (step.type === 'basic_step' || step.type === 'timer_step') && step.content}
        <div
          role="presentation"
          class="step_content"
        >
          <Page_Content content={step.content} />
        </div>
      {/if}

      {#if step.type === 'timer_step'}
        <span>
          {new Intl.DateTimeFormat('en', { minute: 'numeric', hour: 'numeric' }).format(
            step.duration,
          )}
        </span>
      {/if}

      {#if step.type === 'repeating_steps'}
        <ol class="repeating_step_steps steps">
          {#each step.steps as child_step}
            <li class="step">
              <span class="step_title">
                {child_step.title}
              </span>

              {#if (child_step.type === 'basic_step' || child_step.type === 'timer_step') && child_step.content}
                <div
                  role="presentation"
                  class="step_content"
                >
                  <Page_Content content={child_step.content} />
                </div>
              {/if}
            </li>
          {/each}
        </ol>

        <span class="repeating_step_repetitions">{0} / {step.repetitions}</span>
      {/if}
    </li>
  {/each}
</ol>

<style>
  .text_content {
    margin-inline: var(--margin_content_text);
  }

  h1 {
    margin-top: 4rem;
    font-weight: 800;
    font-size: 1.5rem;
    line-height: 1;
  }

  .description {
    margin-top: 0.5rem;
  }

  h2 {
    margin-top: 2rem;
    font-weight: 800;
    font-size: 1.125rem;
    line-height: 1;
  }

  .ingredients_list {
    margin-top: 0.5rem;
  }

  .steps {
    display: grid;
    gap: 2rem;
    margin-top: 1rem;
    list-style-type: decimal;
  }

  .step {
    position: relative;
  }

  .step_title {
    display: block;
    position: sticky;
    top: 0;
    background-color: white;
    font-weight: 800;
    font-size: 1.125rem;
  }

  .step_content {
    margin-top: 0.5rem;
  }

  .repeating_step_steps {
    gap: 1rem;
    border-left-width: 2px;
    border-color: #000000;
    padding-bottom: 1rem;
    padding-left: 2.5rem;
    list-style-type: lower-roman;
  }

  .repeating_step_repetitions {
    display: block;
    margin-top: 0.5rem;
  }
</style>

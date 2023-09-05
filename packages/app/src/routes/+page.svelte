<script>
  import Technology_Graph from '$components/technology_graph.svelte'
  import Project_Carousel from './project_carousel.svelte'

  export let data

  const date_format = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
  })
</script>

<div role="presentation">
  <div
    role="presentation"
    class="technology_graph"
  >
    <Technology_Graph technologies={data.technologies} />
  </div>
</div>

<h1>aptt</h1>

<!-- projects -->
<h2>Stuff I've worked on</h2>

<div
  role="presentation"
  class="project_carousel"
>
  <Project_Carousel projects={data.projects} />
</div>

<!-- activities -->
<h2>Stuff I've done</h2>

<ul class="activities">
  {#each data.activities as activity}
    <li class="activity">
      <span class="activity_title">{activity.title}</span>

      <time class="activity_date">
        {#if activity.date instanceof Date}
          {date_format.format(activity.date)}
        {:else}
          {@const { start, end } = activity.date}
          {#if end}
            {date_format.formatRange(start, end)}
          {:else}
            since {date_format.format(start)}
          {/if}
        {/if}
      </time>

      {#if activity.place?.icon}
        <img
          class="activity_place"
          src={activity.place.icon}
          alt="{activity.place.name} logo"
          title={activity.place.name}
        />
      {:else if activity.place}
        <span class="activity_place">{activity.place.name}</span>
      {/if}

      {#if activity.events.length}
        <ul class="activity_events">
          {#each activity.events as event}
            <li>
              <span>{event.title}</span>

              <time>{date_format.format(event.date)}</time>
            </li>
          {/each}
        </ul>
      {/if}
    </li>
  {/each}
</ul>

<style>
  .technology_graph {
    margin-inline: var(--margin_content_layout);
    margin-block: 4rem;
  }

  .project_carousel {
    margin-top: 2rem;
  }

  .activities {
    display: grid;
    gap: 3rem;
    margin-top: 2rem;
    margin-inline: var(--margin_content_page);
  }

  .activity {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'title place'
      'date place';
    column-gap: 3rem;
    box-shadow: 0 0.25rem 0.5rem #00000033;
    border-radius: 0.5rem;
    padding: 1.5rem 2rem;
  }

  .activity_title {
    grid-area: title;
    font-weight: 800;
    font-size: 1.25rem;
  }

  .activity_place {
    grid-area: place;
    width: auto;
    height: 3rem;
  }

  .activity_date {
    grid-area: date;
  }

  .activity_events {
    margin-top: 2rem;
  }

  h1 {
    margin-inline: var(--margin_content_text);
    font-weight: 800;
    font-size: 1.5rem;
  }

  h2 {
    margin-inline: var(--margin_content_page);
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 4rem);
    color: #888888;
    text-transform: lowercase;
    margin-top: 4rem;
  }
</style>

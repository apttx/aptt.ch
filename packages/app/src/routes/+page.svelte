<script>
  import Page from '$components/page.svelte'
  import Project_Carousel from './project_carousel.svelte'

  export let data

  const date_format = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
  })
</script>

<Page>
  <div
    role="presentation"
    class="hero colored_neutral-1"
  >
    <h1>aptt</h1>
  </div>

  <!-- projects -->
  <section>
    <h2>Stuff I've worked on</h2>

    <div
      role="presentation"
      class="project_carousel"
    >
      <Project_Carousel projects={data.projects} />
    </div>
  </section>

  <!-- activities -->
  <section class="colored_neutral-1">
    <h2>Stuff I've done</h2>

    <ul class="activities">
      {#each data.activities as activity, index}
        <li
          class="activity colored_base"
          class:span_2={data.activities.length % 2 === 1 && index === data.activities.length - 1}
        >
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
  </section>
</Page>

<style>
  .hero {
    display: grid;
    align-content: center;
    justify-content: center;
    background-image: url('/images/banner.jpg');
    background-size: cover;
    height: 100vh;
    scroll-snap-align: start;
    font-weight: 800;
    font-size: clamp(3rem, 10vw, 6rem);
    text-shadow: 0 0 1rem #00000055;
  }

  section {
    padding-block: 4rem;
    min-height: 100vh;
  }

  h2 {
    margin-inline: var(--margin_content_page);
    font-weight: 800;
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1;
    text-transform: lowercase;
  }

  .project_carousel {
    margin-top: 3rem;
  }

  .activities {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 3rem;
    margin-inline: var(--margin_content_text);
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

  @media (min-width: 70rem) {
    .activities {
      grid-template-columns: repeat(2, 1fr);
      margin-inline: var(--margin_content_layout);
    }
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
</style>

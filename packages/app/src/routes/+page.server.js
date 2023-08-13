import { gql } from '@urql/core'
import { client } from '../graphql.mjs'
import { error } from '@sveltejs/kit'

/** @typedef {Pick<Technology, 'name' | 'icon' | 'enjoyment' | 'familiarity'>} Technology_Fragment */

const technology_fragment = gql`
  fragment technology_fragment on Technology {
    name
    icon
    enjoyment
    familiarity
  }
`

/**
 * @type {import('@urql/core').TypedDocumentNode<{
 *   technologies: Technology_Fragment[]
 *   projects: {
 *     title: string
 *     description: string
 *     thumbnail: { url: string }
 *     url: string
 *     technologies: (
 *       | Technology_Fragment
 *       | { technologies: Technology_Fragment }
 *       | {
 *           connector?: Technology_Fragment
 *           source: Technology_Fragment
 *           target: Technology_Fragment
 *         }
 *     )[]
 *   }[]
 *   activities: {
 *     title: string
 *     place: {
 *       name: string
 *       icon?: string
 *     }
 *     date:
 *       | {
 *           iso_8601: string
 *         }
 *       | {
 *           start: {
 *             iso_8601: string
 *           }
 *           end?: { iso_8601: string }
 *         }
 *     events: {
 *       title: string
 *       date: {
 *         iso_8601: string
 *       }
 *     }[]
 *   }[]
 * }>}
 */
const projects_query = gql`
  {
    technologies {
      ...technology_fragment
    }

    projects {
      title
      description
      thumbnail {
        url
      }
      url
      technologies {
        __typename
        ...technology_fragment

        ... on Technology_Group {
          technologies {
            ...technology_fragment
          }
        }

        ... on Technology_Connection {
          connector {
            ...technology_fragment
          }
          source {
            ...technology_fragment
          }
          target {
            ...technology_fragment
          }
        }
      }
    }

    activities {
      title
      place {
        name
        icon
      }
      date {
        ... on Date {
          iso_8601
        }
        ... on Date_Range {
          start {
            iso_8601
          }
          end {
            iso_8601
          }
        }
      }
      events {
        title
        date {
          iso_8601
        }
      }
    }
  }
  ${technology_fragment}
`

export const load = async (event) => {
  const { cookies, fetch } = event

  /** @type {Record<string, string>} */
  let headers = {}
  const access_token = cookies.get('access_token')
  if (access_token) {
    headers['Authorization'] = `Bearer ${access_token}`
  }

  const result = await client.query(projects_query, {}, { fetch, fetchOptions: { headers } })

  if (result.error) {
    throw error(500, result.error.message)
  }

  if (!result.data) {
    throw error(500)
  }

  const projects = result.data.projects
  const technologies = result.data.technologies
  const activities = result.data.activities.map((activity_data) => {
    const { title, place } = activity_data

    let date
    if ('iso_8601' in activity_data.date) {
      date = new Date(activity_data.date.iso_8601)
    } else {
      const start = new Date(activity_data.date.start.iso_8601)
      let end
      if (activity_data.date.end) {
        end = new Date(activity_data.date.end.iso_8601)
      }

      date = {
        start,
        end,
      }
    }

    const events = activity_data.events.map((event_data) => {
      const { title } = event_data

      const date = new Date(event_data.date.iso_8601)

      const event = {
        title,
        date,
      }

      return event
    })

    const activity = {
      title,
      date,
      events,
      place,
    }

    return activity
  })

  return {
    projects,
    technologies,
    activities,
  }
}

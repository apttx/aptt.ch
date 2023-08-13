import { gql } from '@urql/core'
import { client } from '../graphql.mjs'
import { error } from '@sveltejs/kit'

/**
 * @typedef {{
 *   type: 'edge'
 *   source: string
 *   target: string
 *   icon: string
 * }} Technology_Edge
 */

/**
 * @typedef {{
 *   id: string
 *   type: 'node'
 *   icon: string
 * }} Technology_Node
 */

const technology_fragment = gql`
  fragment technology_fragment on Technology {
    name
    icon
    enjoyment
    familiarity
  }
`

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

  /** @type {Project[]} */
  const projects = result.data.projects
  /** @type {Technology[]} */
  const technologies = result.data.technologies

  return {
    projects,
    technologies,
  }
}

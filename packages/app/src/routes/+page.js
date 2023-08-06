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
  }
`

const projects_query = gql`
  {
    projects(user: { roles: ["employer"] }) {
      title
      description
      thumbnail {
        url
      }
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

    technologies {
      ...technology_fragment
    }
  }
  ${technology_fragment}
`

export const load = async () => {
  const result = await client.query(projects_query, {})

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

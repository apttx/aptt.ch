import { gql } from '@urql/core'
import { client } from '../../../graphql.mjs'
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
 *   project: {
 *     title: string
 *     description: string
 *     thumbnail: { url: string }
 *     url: string
 *     technologies: (
 *       | Technology_Fragment
 *       | { technologies: Technology_Fragment[] }
 *       | {
 *           connector?: Technology_Fragment
 *           source: Technology_Fragment
 *           target: Technology_Fragment
 *         }
 *     )[]
 *   }
 * }>}
 */
const projects_query = gql`
  query project($slug: String!) {
    project(where: { slug: $slug }) {
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
  const { cookies, fetch, params } = event

  /** @type {Record<string, string>} */
  let headers = {}
  const access_token = cookies.get('access_token')
  if (access_token) {
    headers['Authorization'] = `Bearer ${access_token}`
  }

  const result = await client.query(
    projects_query,
    { slug: params.slug },
    { fetch, fetchOptions: { headers } },
  )

  if (!result.data?.project) {
    throw error(404)
  }

  const project = result.data.project

  return {
    project,
  }
}

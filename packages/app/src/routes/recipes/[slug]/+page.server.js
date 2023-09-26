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
 *     content: Page_Content[]
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

      content
    }
  }
  ${technology_fragment}
`

/**
 * @typedef {{
 *   type: 'basic_step'
 *   title: string
 *   content?: Page_Content[]
 * }} Basic_Step
 */

/**
 * @typedef {{
 *   type: 'timer_step'
 *   title: string
 *   duration: number
 *   content?: Page_Content[]
 * }} Timer_Step
 */

/**
 * @typedef {{
 *   type: 'repeating_steps'
 *   title: string
 *   steps: Recipe_Step[]
 *   repetitions: number
 * }} Repeating_Steps
 */

/** @typedef {Basic_Step | Timer_Step | Repeating_Steps} Recipe_Step */

/**
 * @typedef {{
 *   title: string
 *   description: string
 *   yields: string
 *   ingredients: any[]
 *   steps: Recipe_Step[]
 * }} Recipe
 */

export const load = async (event) => {
  // const { cookies, fetch, params } = event

  // /** @type {Record<string, string>} */
  // let headers = {}
  // const access_token = cookies.get('access_token')
  // if (access_token) {
  //   headers['Authorization'] = `Bearer ${access_token}`
  // }

  // const result = await client.query(
  //   projects_query,
  //   { slug: params.slug },
  //   { fetch, fetchOptions: { headers } },
  // )

  // if (!result.data?.project) {
  //   throw error(404)
  // }

  /** @type {Recipe} */
  const recipe = {
    title: 'Pizza Dough',
    description: 'Simple pizza dough recipe.',
    yields: '1 small pizza, about 30 centimeters in diameter',
    ingredients: [
      {
        name: 'Flour',
        quantity: {
          unit: {
            name: 'grams',
            symbol: 'g',
          },
          number: 125,
        },
      },
      {
        name: 'Dry yeast',
        quantity: {
          unit: {
            name: 'grams',
            symbol: 'g',
          },
          number: 2,
        },
      },
      {
        name: 'Salt',
        quantity: {
          unit: {
            name: 'grams',
            symbol: 'g',
          },
          number: 3,
        },
      },
    ],
    steps: [
      {
        type: 'basic_step',
        title: 'Combine dry ingredients',
        content: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Combine flour, dry yeast, salt and sugar.',
              },
            ],
          },
        ],
      },
      {
        type: 'basic_step',
        title: 'Add water',
        content: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Warm up water until it starts to feel warm, not hot. The water should be between 35 & 40 degrees celsius.',
              },
            ],
          },
        ],
      },
      {
        type: 'basic_step',
        title: 'Mix until combined',
        content: [
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                text: 'Mix until well combined. The dough will be quite sticky at this point.',
              },
            ],
          },
        ],
      },
      {
        type: 'repeating_steps',
        title: 'Let rest and knead',
        steps: [
          {
            type: 'timer_step',
            title: 'Let rest for 30 minutes',
            duration: 10800000,
          },
          {
            type: 'timer_step',
            title: 'Knead',
            duration: 36000000,
          },
        ],
        repetitions: 3,
      },
    ],
  }

  return {
    recipe,
  }
}

import { createYoga } from 'graphql-yoga'

import { schema } from './schema.mjs'

/**
 * @type {(options: {
 *   context: () => Resolver_Context
 *   graphiql?: boolean
 *   landingPage?: boolean
 * }) => import('node:http').RequestListener}
 */
export const get_handler = (options) => {
  const graphiql = options.graphiql ?? false
  const landingPage = options.landingPage ?? false
  const context = options.context

  const yoga = createYoga({
    schema,
    context,
    graphiql,
    landingPage,
  })

  return yoga
}

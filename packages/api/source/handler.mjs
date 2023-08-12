import { createYoga } from 'graphql-yoga'

import { schema } from './schema.mjs'
import { verify } from './jwt.mjs'

/** @type {(options: { jwt_secret: string }, request: Request) => User} */
export const get_user_from_request = (options, request) => {
  /** @type {User} */
  const public_user = {
    roles: [],
  }

  const authorization_header = request.headers.get('Authorization')
  if (!authorization_header) {
    return public_user
  }

  const [scheme, credentials] = authorization_header.split(' ')

  if (scheme !== 'Bearer') {
    return public_user
  }

  try {
    const user = verify({ secret: options.jwt_secret }, credentials)

    return user
  } catch {
    // ignore error
  }

  return public_user
}

/**
 * @type {(options: {
 *   context: (initial_context: import('graphql-yoga').YogaInitialContext) => Resolver_Context
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

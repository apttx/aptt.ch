import assert from 'node:assert'
import { env } from 'node:process'
import { parse } from 'devalue'

import { read_dotenv } from './environment.mjs'
import { get_user_from_request } from './handler.mjs'

const environment = read_dotenv()

const jwt_secret = environment.PRIVATE_JWT_SECRET
assert(
  jwt_secret,
  'missing `PRIVATE_JWT_SECRET` in environment.\n  ~~> $ echo PRIVATE_JWT_SECRET=replace_this >> .env',
)

/**
 * @type {() => (
 *   initial_context: import('graphql-yoga').YogaInitialContext,
 * ) => Resolver_Context}
 */
export const context_from_env = () => {
  /** @type {Restricted_Project[]} */
  let projects = []
  if (env.PRIVATE_PROJECTS) {
    projects = parse(env.PRIVATE_PROJECTS)
  }

  /** @type {Technology[]} */
  let technologies = []
  if (env.PRIVATE_TECHNOLOGIES) {
    technologies = parse(env.PRIVATE_TECHNOLOGIES)
  }

  /** @type {Restricted_Activity[]} */
  let activities = []
  if (env.PRIVATE_ACTIVITIES) {
    activities = parse(env.PRIVATE_ACTIVITIES)
  }

  /** @type {(initial_context: import('graphql-yoga').YogaInitialContext) => Resolver_Context} */
  const context_function = (initial_context) => {
    const user = get_user_from_request({ jwt_secret }, initial_context.request)

    const context = {
      projects,
      technologies,
      activities,
      user,
    }

    return context
  }

  return context_function
}

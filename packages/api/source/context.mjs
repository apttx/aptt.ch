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

/** @type {(restriction: Restriction, user?: { roles: string[] }) => boolean} */
const meets_restriction = (restriction, user) => {
  if (!user) {
    return false
  }

  const has_all_roles = restriction.roles.every((role) => user.roles.includes(role))

  return has_all_roles
}

/**
 * @type {(options: {
 *   user: User
 *   technologies: Technology[]
 *   projects: (Project & Restricted_Element & Content_Element)[]
 *   activities: (Activity & Restricted_Element & Content_Element)[]
 * }) => Resolver_Context}
 */
export const get_resolver_context = (context) => {
  const { user, technologies } = context

  const projects = context.projects.filter((project) => {
    const meets_all_restrictions = project.restrictions.some((restriction) =>
      meets_restriction(restriction, context.user),
    )

    return meets_all_restrictions
  })

  const activities = context.activities.filter((project) => {
    const meets_all_restrictions = project.restrictions.some((restriction) =>
      meets_restriction(restriction, context.user),
    )

    return meets_all_restrictions
  })

  /** @type {Resolver_Context} */
  const resolver_context = {
    user,
    technologies,
    projects,
    activities,
  }

  return resolver_context
}

/**
 * @type {() => (
 *   initial_context: import('graphql-yoga').YogaInitialContext,
 * ) => Resolver_Context}
 */
export const context_from_env = () => {
  /** @type {(Project & Restricted_Element & Content_Element)[]} */
  let projects = []
  if (env.PRIVATE_PROJECTS) {
    projects = parse(env.PRIVATE_PROJECTS)
  }

  /** @type {Technology[]} */
  let technologies = []
  if (env.PRIVATE_TECHNOLOGIES) {
    technologies = parse(env.PRIVATE_TECHNOLOGIES)
  }

  /** @type {(Activity & Restricted_Element & Content_Element)[]} */
  let activities = []
  if (env.PRIVATE_ACTIVITIES) {
    activities = parse(env.PRIVATE_ACTIVITIES)
  }

  /** @type {(initial_context: import('graphql-yoga').YogaInitialContext) => Resolver_Context} */
  const context_function = (initial_context) => {
    const user = get_user_from_request({ jwt_secret }, initial_context.request)

    const context = get_resolver_context({ user, technologies, projects, activities })

    return context
  }

  return context_function
}

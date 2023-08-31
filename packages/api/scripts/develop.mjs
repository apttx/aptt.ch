import { createServer } from 'node:http'
import assert from 'node:assert'

import { read_dotenv } from '../source/environment.mjs'
import { get_handler, get_user_from_request } from '../source/handler.mjs'

import { technologies } from '../data/technolgies.mjs'
import { projects } from '../data/projects.mjs'
import { activities } from '../data/activities.mjs'
import { nanoid } from 'nanoid'

/** @type {(url_unsafe_string: string) => string} */
const get_slug = (url_unsafe_string) => {
  const slug = url_unsafe_string.toLowerCase().replace(/\W+/g, '-')

  return slug
}

const main = async () => {
  const environment = read_dotenv()

  const jwt_secret = environment.PRIVATE_JWT_SECRET
  assert(
    jwt_secret,
    'missing `PRIVATE_JWT_SECRET` in environment.\n  ~~> $ echo PRIVATE_JWT_SECRET=replace_this >> .env',
  )

  /** @type {(initial_context: import('graphql-yoga').YogaInitialContext) => Resolver_Context} */
  const context = (initial_context) => {
    const user = get_user_from_request({ jwt_secret }, initial_context.request)

    const content_projects = projects.map((project) => {
      const id = nanoid()
      const slug = get_slug(project.title)
      const content_element_properties = {
        id,
        slug,
      }

      const result = {
        ...project,
        ...content_element_properties,
      }

      return result
    })

    const content_activities = activities.map((activity) => {
      const id = nanoid()
      const slug = get_slug(activity.title)
      const content_element_properties = {
        id,
        slug,
      }

      const result = {
        ...activity,
        ...content_element_properties,
      }

      return result
    })

    /** @type {Resolver_Context} */
    const context = {
      technologies,
      projects: content_projects,
      activities: content_activities,
      user,
    }

    return context
  }

  const handler = get_handler({ graphiql: true, context })
  const server = createServer(handler)

  server.listen(4000, () => console.debug('~~> http://localhost:4000/graphql'))
}

main()

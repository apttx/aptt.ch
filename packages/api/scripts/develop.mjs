import { createServer } from 'node:http'
import assert from 'node:assert'

import { read_dotenv } from '../source/environment.mjs'
import { get_handler, get_user_from_request } from '../source/handler.mjs'

import { technologies } from '../data/technolgies.mjs'
import { projects } from '../data/projects.mjs'

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

    const context = {
      technologies,
      projects,
      user,
    }

    return context
  }

  const handler = get_handler({ graphiql: true, context })
  const server = createServer(handler)

  server.listen(4000, () => console.debug('~~> http://localhost:4000/graphql'))
}

main()

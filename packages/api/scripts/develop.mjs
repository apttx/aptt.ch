import { createServer } from 'node:http'

import { get_handler } from '../source/handler.mjs'

import { technologies } from '../data/technolgies.mjs'
import { projects } from '../data/projects.mjs'

const start = async () => {
  const context = () => ({ technologies, projects })
  const handler = get_handler({ graphiql: true, context })
  const server = createServer(handler)

  server.listen(4000, () => console.debug('~~> http://localhost:4000/graphql'))
}

start()

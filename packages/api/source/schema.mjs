import { createSchema } from 'graphql-yoga'

import { typeDefs } from './type_definitions.mjs'
import { resolvers } from './resolvers.mjs'

export const schema = createSchema({ typeDefs, resolvers })

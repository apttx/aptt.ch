import { env } from 'node:process'
import { parse } from 'devalue'

/** @type {() => () => Resolver_Context} */
export const context_from_env = () => {
  let projects = []
  let technologies = []

  if (env.PRIVATE_PROJECTS) {
    projects = parse(env.PRIVATE_PROJECTS)
  }

  if (env.PRIVATE_TECHNOLOGIES) {
    technologies = parse(env.PRIVATE_TECHNOLOGIES)
  }

  const context = {
    projects,
    technologies,
  }

  const context_function = () => context

  return context_function
}

/** @type {(restriction: Restriction, user?: { roles: string[] }) => boolean} */
const meets_restriction = (restriction, user) => {
  if (!user) {
    return false
  }

  const has_all_roles = restriction.roles.every((role) => user.roles.includes(role))

  return has_all_roles
}

/**
 * @type {(
 *   technology: Technology | Technology_Group | Technology_Connection,
 * ) => 'Technology' | 'Technology_Group' | 'Technology_Connection'}
 */
const resolve_technology_type = (technology) => {
  if ('source' in technology && 'target' in technology) {
    return 'Technology_Connection'
  }

  if ('technologies' in technology) {
    return 'Technology_Group'
  }

  return 'Technology'
}

/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   unknown,
 *   Resolver_Context,
 *   { user?: { roles: string[] } }
 * >}
 */
export const projects = (_, args, context) => {
  const projects = context.projects
    .filter((project) => {
      if (!project.restrictions) {
        return true
      }

      const meets_all_restrictions = project.restrictions.every((restriction) =>
        meets_restriction(restriction, args.user),
      )

      return meets_all_restrictions
    })
    .map((project) => {
      const resolved_technologies = project.technologies.map((technology) => {
        const __typename = resolve_technology_type(technology)

        return {
          ...technology,
          __typename,
        }
      })

      return {
        ...project,
        technologies: resolved_technologies,
      }
    })

  return projects
}

/** @type {import('graphql').GraphQLFieldResolver<unknown, Resolver_Context>} */
export const technologies = (_, __, context) => {
  const technologies = context.technologies

  return technologies
}

export const resolvers = {
  Query: {
    projects,
    technologies,
  },
}

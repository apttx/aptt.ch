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

/** @type {import('graphql').GraphQLFieldResolver<unknown, Resolver_Context>} */
export const projects = (_, __, context) => {
  const projects = context.projects.filter((project) => {
    const meets_all_restrictions = project.restrictions.every((restriction) =>
      meets_restriction(restriction, context.user),
    )

    return meets_all_restrictions
  })

  return projects
}

/** @type {import('graphql').GraphQLFieldResolver<unknown, Resolver_Context>} */
export const technologies = (_, __, context) => {
  const technologies = context.technologies

  return technologies
}

/** @type {import('graphql').GraphQLFieldResolver<unknown, Resolver_Context>} */
export const me = (_, __, context) => {
  return context.user
}

export const resolvers = {
  Query: {
    projects,
    technologies,
    me,
  },
  Project_Technology: {
    /**
     * @type {import('graphql').GraphQLTypeResolver<
     *   Technology | Technology_Group | Technology_Connection,
     *   Resolver_Context
     * >}
     */
    __resolveType: resolve_technology_type,
  },
}

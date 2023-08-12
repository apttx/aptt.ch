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
export const activities = (_, __, context) => {
  const activities = context.activities.filter((project) => {
    const meets_all_restrictions = project.restrictions.every((restriction) =>
      meets_restriction(restriction, context.user),
    )

    return meets_all_restrictions
  })

  return activities
}

/** @type {import('graphql').GraphQLFieldResolver<unknown, Resolver_Context>} */
export const me = (_, __, context) => {
  return context.user
}

/** @type {(technology: Date | Date_Range) => 'Date' | 'Date_Range'} */
const resolve_activity_date_type = (activity_date) => {
  if (activity_date instanceof Date) {
    return 'Date'
  }

  return 'Date_Range'
}

export const resolvers = {
  Query: {
    projects,
    technologies,
    activities,
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
  Activity_Date: {
    /** @type {import('graphql').GraphQLTypeResolver<Date | Date_Range, Resolver_Context>} */
    __resolveType: resolve_activity_date_type,
  },
  Date: {
    /** @type {import('graphql').GraphQLFieldResolver<Date, Resolver_Context>} */
    iso_8601: (parent) => {
      const iso_8601 = parent.toISOString()

      return iso_8601
    },
  },
}

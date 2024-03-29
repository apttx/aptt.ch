import { createGraphQLError } from 'graphql-yoga'

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
  return context.projects
}

/** @type {import('graphql').GraphQLFieldResolver<unknown, Resolver_Context>} */
export const technologies = (_, __, context) => {
  const technologies = context.technologies

  return technologies
}

/** @type {(date?: Date | Date_Range) => number} */
const get_date_compare_value = (date) => {
  if (!date) {
    return 0
  }

  if ('start' in date) {
    const value = date.end?.getTime() ?? Infinity

    return value
  }

  if (date instanceof Date) {
    return date.getTime()
  }

  return 0
}

/** @type {import('graphql').GraphQLFieldResolver<unknown, Resolver_Context>} */
export const activities = (_, __, context) => {
  const activities = context.activities.sort((activity_a, activity_b) => {
    const activity_a_value = get_date_compare_value(activity_a.date)
    const activity_b_value = get_date_compare_value(activity_b.date)

    return activity_b_value - activity_a_value
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

/**
 * @type {<Property_Key extends string, Property_Type = any>(
 *   property: Property_Key,
 *   value: Property_Type,
 * ) => <Type extends Record<Property_Key, Property_Type>>(object: Type) => boolean}
 */
const get_matches_property = (property, value) => (object) => object[property] === value

/**
 * @type {import('graphql').GraphQLFieldResolver<
 *   unknown,
 *   Resolver_Context,
 *   { where: { slug?: string; id?: string } }
 * >}
 */
const project = (_, params, context) => {
  /** @type {((project: Record<string, any>) => boolean)[]} */
  const matchers = []

  if (params.where?.id) {
    const matches_id = get_matches_property('id', params.where.id)

    matchers.push(matches_id)
  }

  if (params.where?.slug) {
    const matches_slug = get_matches_property('slug', params.where.slug)

    matchers.push(matches_slug)
  }

  const project = context.projects.find((project) => {
    const matches_everything = matchers.every((matches) => matches(project))

    return matches_everything
  })

  if (!project) {
    throw createGraphQLError(`there is no project matching the given parameters`, {
      extensions: { code: 'not_found', params: params },
    })
  }

  return project
}

export const resolvers = {
  Query: {
    project,
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

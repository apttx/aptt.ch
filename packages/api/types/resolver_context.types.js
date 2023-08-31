/**
 * @typedef {{
 *   slug: string
 *   id: string
 * }} Content_Element
 */

/**
 * @typedef {{
 *   restrictions: Restriction[]
 * }} Restricted_Element
 */

/**
 * @typedef {{
 *   roles: string[]
 * }} Restriction
 */

/**
 * @typedef {{
 *   roles: string[]
 * }} User
 */

/**
 * @typedef {{
 *   projects: (Project & Content_Element & Restricted_Element)[]
 *   technologies: Technology[]
 *   activities: (Activity & Content_Element & Restricted_Element)[]
 *   user: User
 * }} Resolver_Context
 */

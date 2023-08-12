/**
 * @typedef {{
 *   roles: string[]
 * }} Restriction
 */

/**
 * @typedef {Project & {
 *   restrictions: Restriction[]
 * }} Restricted_Project
 */

/**
 * @typedef {{
 *   roles: string[]
 * }} User
 */

/**
 * @typedef {{
 *   projects: Restricted_Project[]
 *   technologies: Technology[]
 *   user: User
 * }} Resolver_Context
 */

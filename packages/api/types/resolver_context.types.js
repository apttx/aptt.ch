/**
 * @typedef {{
 *   roles: string[]
 * }} Restriction
 */

/**
 * @typedef {Project & {
 *     restrictions?: Restriction[]
 *   }} Restricted_Project
 */

/**
 * @typedef {{
 *   projects: Restricted_Project[]
 *   technologies: Technology[]
 * }} Resolver_Context
 */

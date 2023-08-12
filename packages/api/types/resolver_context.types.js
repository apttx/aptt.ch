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
 * @typedef {Activity & {
 *   restrictions: Restriction[]
 * }} Restricted_Activity
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
 *   activities: Restricted_Activity[]
 *   user: User
 * }} Resolver_Context
 */

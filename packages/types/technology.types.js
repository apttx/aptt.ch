/**
 * @typedef {{
 *   name: string
 *   version?: string
 *   icon?: string
 *   familiarity: number
 *   enjoyment: number
 * }} Technology
 */

/**
 * @typedef {{
 *   technologies: Technology[]
 * }} Technology_Group
 */

/**
 * @typedef {{
 *   connector?: Technology
 *   source: Technology
 *   target: Technology
 * }} Technology_Connection
 */

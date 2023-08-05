/**
 * @typedef {{
 *  name: string
 *  version?: string
 *  icon?: string
 * }} Technology
 */

/**
 * @typedef {{
 *  technologies: Technology[]
 * }} Technology_Group
 */

/**
 * @typedef {{
 *  connector?: Technology
 *  source: Technology
 *  target: Technology
 * }} Technology_Connection
 */

/**
 * @typedef {{
 *   title: string
 *   description: string
 *   technologies: (Technology | Technology_Group | Technology_Connection)[]
 * }} Project
 */

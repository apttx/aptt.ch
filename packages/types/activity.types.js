/**
 * @typedef {{
 *   title: string
 *   description: string
 *   date: Date
 * }} Activity_Event
 */

/**
 * @typedef {{
 *   title: string
 *   description: string
 *   date?: Date | Date_Range
 *   place?: Place
 *   projects: Project[]
 *   events: Activity_Event[]
 * }} Activity
 */

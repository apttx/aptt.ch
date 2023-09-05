/**
 * @typedef {{
 *   type: 'text'
 *   text: string
 * }} Rich_Text_Text
 */

/**
 * @typedef {{
 *   type: 'anchor'
 *   text: string
 *   href: string
 *   rel?: string
 *   target?: '_blank'
 * }} Rich_Text_Anchor
 */

/** @typedef {Rich_Text_Text | Rich_Text_Anchor} Rich_Text */

/**
 * @typedef {{
 *   type: 'heading'
 *   level: number
 *   children: Rich_Text[]
 * }} Page_Content_Heading
 */

/**
 * @typedef {{
 *   type: 'paragraph'
 *   children: Rich_Text[]
 * }} Page_Content_Paragraph
 */

/** @typedef {Page_Content_Heading | Page_Content_Paragraph} Page_Content */

/**
 * @typedef {{
 *   content: Page_Content[]
 * }} Page
 */

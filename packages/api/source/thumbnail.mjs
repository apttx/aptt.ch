import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { cwd } from 'node:process'

/** @type {(file_name: string) => Buffer} */
export const read_thumbnail_synchronously = (file_name) => {
  const relative_file_path = join('data/thumbnails', file_name)
  const absolute_file_path = resolve(cwd(), relative_file_path)

  const data = readFileSync(absolute_file_path)

  return data
}

/** @type {(buffer: Buffer) => string} */
export const get_png_data_url = (buffer) => {
  const base64_data_string = buffer.toString('base64')
  const data_url = `data:image/png;base64,${base64_data_string}`

  return data_url
}

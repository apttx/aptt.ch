import { writeFile } from 'node:fs/promises'
import { format } from 'prettier'

import { icons } from '@iconify-json/skill-icons'

const main = async () => {
  const icon_entries = Object.entries(icons.icons)

  const icon_constants = icon_entries.map(([key, icon]) => {
    const constant_name = key.replace(/[^a-z]+/gi, '_')

    const svg_string = `<svg xmlns="http://www.w3.org/2000/svg" width="${icons.width}" height="${
      icons.height
    }" viewBox="${icons.top ?? 0} ${icons.left ?? 0} ${icons.height} ${icons.width}">${
      icon.body
    }</svg>`
    const base64_svg_string = Buffer.from(svg_string).toString('base64')
    const data_url = `data:image/svg+xml;base64,${base64_svg_string}`

    const template = `export const ${constant_name} = '${data_url}'`

    return template
  })

  const file_template = await format(icon_constants.join('\n'), { parser: 'babel' })

  await writeFile('data/icons.mjs', file_template)
}

main()

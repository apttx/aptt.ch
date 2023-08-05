import { stringify } from 'devalue'

import { projects } from '../data/projects.mjs'
import { technologies } from '../data/technolgies.mjs'

const main = async () => {
  const projects_string = stringify(projects)
  const PRIVATE_PROJECTS = `PRIVATE_PROJECTS='${projects_string}'`
  const technolgies_string = stringify(technologies)
  const PRIVATE_TECHNOLOGIES = `PRIVATE_TECHNOLOGIES='${technolgies_string}'`

  const dotenv_string = [PRIVATE_PROJECTS, PRIVATE_TECHNOLOGIES].join('\n')

  console.info(dotenv_string)
}

main()

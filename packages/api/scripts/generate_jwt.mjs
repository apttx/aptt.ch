import { argv } from 'node:process'
import assert from 'node:assert'

import { sign } from '../source/jwt.mjs'
import { read_dotenv } from '../source/environment.mjs'

/** @type {(argument_variable: string[]) => string[]} */
const get_roles = (argument_variable) => {
  const index_of_dash_dash_roles = argument_variable.indexOf('--roles')

  if (index_of_dash_dash_roles === -1) {
    throw 'missing `--roles <roles, comma separated>`'
  }

  const comma_separated_roles = argument_variable[index_of_dash_dash_roles + 1]

  const roles = comma_separated_roles.split(',')

  return roles
}

/** @type {(argument_variable: string[]) => Date} */
const get_expiration = (argument_variable) => {
  const index_of_dash_dash_roles = argument_variable.indexOf('--expiration')

  if (index_of_dash_dash_roles === -1) {
    throw 'missing `--expiration <date, yyyy-mm-dd>`'
  }

  const date_string = argument_variable[index_of_dash_dash_roles + 1]
  const date_attribute_strings = date_string.split('-')
  const [year, month, day] = date_attribute_strings.map((string) => parseInt(string))

  const expiration = new Date(Date.UTC(year, month, day))

  return expiration
}

const main = () => {
  const environment = read_dotenv()

  const secret = environment.PRIVATE_JWT_SECRET
  assert(
    secret,
    'missing `PRIVATE_JWT_SECRET` in environment.\n  ~~> $ echo PRIVATE_JWT_SECRET=replace_this >> .env',
  )

  const roles = [
    // all authenticated users can see public
    'public',
    ...get_roles(argv),
  ]

  const expires_at = get_expiration(argv)

  /** @type {User} */
  const user = {
    roles,
  }

  const jwt = sign({ secret, expires_at }, user)

  console.info(
    `${jwt}\n  ~~> http://localhost:5173/login?access_token=${jwt}\n  ~~> https://aptt.ch/login?access_token=${jwt}`,
  )
}

main()

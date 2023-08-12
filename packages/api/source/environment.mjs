import { env } from 'node:process'
import { config } from 'dotenv'

export const read_dotenv = () => {
  /** @type {Record<string, string>} */
  const environment = {}
  config({ processEnv: environment })

  const combined_environment = {
    ...environment,
    ...env,
  }

  return combined_environment
}

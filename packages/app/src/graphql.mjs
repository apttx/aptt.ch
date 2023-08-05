import { Client, fetchExchange } from '@urql/core'

import { PUBLIC_GRAPHQL_URL } from '$env/static/public'

const url = PUBLIC_GRAPHQL_URL

export const client = new Client({ url, exchanges: [fetchExchange] })

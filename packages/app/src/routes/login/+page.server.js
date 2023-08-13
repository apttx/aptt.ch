import { redirect } from '@sveltejs/kit'
import { decode } from 'jsonwebtoken'

const redirect_object = redirect(302, '/')

export const load = (event) => {
  const { url } = event

  const access_token = url.searchParams.get('access_token')
  if (!access_token) {
    throw redirect_object
  }

  // redirect if token has invalid structure
  try {
    decode(access_token, { complete: true })
  } catch {
    throw redirect_object
  }
}

export const actions = {
  login: async (event) => {
    const data = await event.request.formData()

    const access_token = data.get('access_token')
    if (typeof access_token !== 'string') {
      throw redirect_object
    }

    /** @type {import('jsonwebtoken').Jwt | null} */
    let jwt = null
    try {
      jwt = decode(access_token, { complete: true })
    } catch {
      // ignore errors
    }
    if (!jwt) {
      throw redirect_object
    }

    const { payload } = jwt
    if (typeof payload === 'string') {
      throw redirect_object
    }

    const path = '/'
    const sameSite = 'strict'
    const httpOnly = true
    const secure = true
    let expires = undefined

    const { exp } = payload
    /** @type {Date | undefined} */
    if (exp !== undefined) {
      expires = new Date(exp * 1000)
    }

    event.cookies.set('access_token', access_token, { path, sameSite, httpOnly, secure, expires })

    throw redirect_object
  },
}

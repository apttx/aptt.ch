import jsonwebtoken from 'jsonwebtoken'

export const issuer = 'https://aptt.ch'
export const audience = 'https://aptt.ch'

/** @typedef {{ secret: string; expires_at?: Date }} JwtOptions */

/** @type {(options: JwtOptions, user: User) => string} */
export const sign = (options, user) => {
  /** @type {number | undefined} */
  let expiresIn = undefined
  if (options.expires_at) {
    expiresIn = Math.floor((options.expires_at.getTime() - Date.now()) / 1000)
  }

  const jwt = jsonwebtoken.sign(user, options.secret, { audience, issuer, expiresIn })

  return jwt
}

/**
 * Shortcut to verify a jwt with internally defined properties (issuer, audience)
 *
 * Does not catch jsonwebtoke.verify errors.
 *
 * @type {(options: JwtOptions, jwt: string) => User}
 */
export const verify = (options, jwt) => {
  const decoded_jwt = jsonwebtoken.verify(jwt, options.secret, { audience, issuer, complete: true })

  const user = /** @type {User} */ (decoded_jwt.payload)

  return user
}

import { verify } from 'jsonwebtoken'
import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export function authenticate(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next: (err?: ExtendedError | undefined) => void): void {
  const token: string = socket.handshake.auth.token
  const tokenSecret = process.env.TOKEN_SECRET as string
  verify(token, tokenSecret, (err, decoded) => {
    if (decoded !== undefined) {
      console.log(decoded)
      return next()
    } else {
      return next(new Error(err?.message))
    }
  })
}

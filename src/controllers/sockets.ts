import { verify } from 'jsonwebtoken'
import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import Space from '../model/space'

export function authenticate (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, next: (err?: ExtendedError | undefined) => void): void {
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

export function connectToSpace (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, data: any): void {
  const space = data.spaceName
  const key = data.spaceKey
  new Space().authenticateForSpace(space, key).then(match => {
    if (match) {
      void socket.join(space)
    } else {
      socket.emit('Invalid space credentials')
    }
  }).catch(err => console.error(err))
}

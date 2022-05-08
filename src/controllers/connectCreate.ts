import { hash } from 'bcrypt'
import { RequestHandler } from 'express'
import Space from '../model/space'

const createNewSpace: RequestHandler = (req, res, next) => {
  const name: string = req.body.name
  const key: string = req.body.key
  hash(name + key, 10).then(hash => {
    new Space(name, hash).save().then(r => {
      res.status(201).json({
        message: 'space created succesfully'
      })
    }).catch(err => console.error(err))
  }).catch(err => console.error(err))
}

export {
  createNewSpace
}

import { compare } from 'bcrypt'
import { getDB } from '../util/db'
class Space {
  options: any
  key: string
  lastUpdateTime!: number
  creationTime: number
  name: string
  spaceData: [
    {
      version: number
      time: number
      data: any
    }
  ]

  constructor (name: string = '', key: string = '') {
    this.creationTime = Date.now()
    this.spaceData = [{
      version: -1,
      time: Date.now(),
      data: null
    }]
    this.name = name
    this.key = key
  }

  async findSpace (id: string): Promise<any> {
    const db = getDB()
    return await db.collection('spaces').findOne({
      id
    })
  }

  async authenticateForSpace (name: string, key: string): Promise<boolean> {
    const db = getDB()
    const spaceHash = await db.collection('spaces').findOne({
      name
    }, {
      projection: {
        key: 1
      }
    })
    const hash = spaceHash!.key
    return await compare(name + key, hash)
  }

  async getSpace (name: string, key: string): Promise<any> {

  }

  async save (): Promise<any> {
    this.lastUpdateTime = Date.now()
    const db = getDB()
    return await db.collection('spaces').insertOne(this)
  }
}
export default Space

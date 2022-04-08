import { randomBytes } from 'crypto'
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

  constructor(name: string, key: string) {
    this.creationTime = Date.now()
    this.spaceData = [{
      version: -1,
      time: Date.now(),
      data: null
    }]
    this.name = name
    this.key = key
  }

  async findSpace(id: string) {
    const db = getDB()
    return await db.collection('spaces').findOne({
      id
    })
  }

  async save() {
    this.lastUpdateTime = Date.now()
    const db = getDB()
    return await db.collection('spaces').insertOne(this)
  }
}
export default Space

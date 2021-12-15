import { NextFunction, Request, Response, Router } from 'express'
import { getDb } from '../db/conn'
import { ObjectId } from 'mongodb'
export const TestController: Router = Router()

TestController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbConnect = getDb()
    const results = await dbConnect
      .collection('students')
      .aggregate([
        {
          $lookup: {
            from: 'address',
            localField: '_id',
            foreignField: 'student_id',
            as: 'adress_as'
          }
        }
        // this for return a single value not an array (one to one)
        // {
        //   $unwind: {
        //     path: '$adress_as',
        //     preserveNullAndEmptyArrays: true
        //   }
        // }
      ])
      .toArray()
    // for await (const doc of results) {
    //   console.log(doc)
    // }
    res.status(200).send({ data: results })
  } catch (e) {
    next(e)
  }
})

TestController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbConnect = getDb()
    const doc = {
      name: req.body.name,
      tgl_lahir: req.body.tgl_lahir
    }

    const result = await dbConnect.collection('students').insertOne(doc)

    const alamat = {
      student_id: result.insertedId,
      name: req.body.name_address,
      city: req.body.city
    }

    const resalamat = await dbConnect.collection('address').insertOne(alamat)
    console.log(resalamat)

    res.status(200).send({ data: 'Insert Success', results: result })
  } catch (error) {
    res.status(401).send(error)
  }
})

TestController.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbConnect = getDb()
    const filter = { _id: new ObjectId(req.body.id) }
    const updateDocument = {
      $set: {
        tgl_lahir: req.body.tgl_lahir
      }
    }
    console.log(filter, updateDocument)
    const results = await dbConnect.collection('students').updateOne(filter, updateDocument)
    res.status(200).send({ data: results })
  } catch (error) {
    res.status(400).send(error)
  }
})

TestController.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbConnect = getDb()
    const id: string = String(req.query.id)
    const filter = { _id: new ObjectId(id) }
    console.log(filter)
    const results = await dbConnect.collection('students').deleteOne(filter)

    res.status(200).send({ data: results })
  } catch (error) {
    res.status(400).send(error)
  }
})

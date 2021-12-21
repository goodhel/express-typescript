import { db } from '../db/conn'
import { ObjectId } from 'mongodb'

interface Students {
  name: string
  tglLahir: Date
}

class _test {
  async getList () {
    return db
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
      .then((results) => {
        return {
          status: true,
          data: results
        }
      })
      .catch((error) => {
        return {
          status: false,
          error
        }
      })
  }

  async insertStudent (body: any) {
    const self = this
    const student = {
      name: body.name,
      tglLahir: new Date()
    }
    return db
      .collection<Students>('students')
      .insertOne(student)
      .then(async (results) => {
        const address = {
          student_id: results.insertedId,
          name: body.name_address,
          city: body.city
        }
        const insAddress = await self.insertAddress(address)

        if (!insAddress.status) {
          return {
            status: false,
            error: 'insert address error'
          }
        }

        return {
          status: true,
          data: results
        }
      })
      .catch((error) => {
        return {
          status: false,
          error
        }
      })
  }

  async insertAddress (data: object) {
    return db
      .collection('address')
      .insertOne(data)
      .then((results) => {
        return {
          status: true,
          data: results
        }
      })
      .catch((error) => {
        return {
          status: false,
          error
        }
      })
  }

  async updateStudent (body: any) {
    const filter = { _id: new ObjectId(body.id) }
    const updateDocument = {
      $set: {
        tglLahir: body.tgl_lahir
      }
    }
    return db
      .collection('students')
      .updateOne(filter, updateDocument)
      .then((results) => {
        return {
          status: true,
          data: results
        }
      })
      .catch((error) => {
        console.log('error update studet ', error)
        return {
          status: false,
          error
        }
      })
  }

  async deleteStudent (id: string) {
    const filter = { _id: new ObjectId(id) }
    return db
      .collection('students')
      .deleteOne(filter)
      .then((results) => {
        return {
          status: true,
          data: results
        }
      })
      .catch((error) => {
        console.log('error delete student ', error)

        return {
          status: false,
          error
        }
      })
  }
}

export default new _test()

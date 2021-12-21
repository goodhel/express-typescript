import { NextFunction, Request, Response, Router } from 'express'
import m$test from '../modules/test.module'
export const TestController: Router = Router()

TestController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await m$test.getList()
    res.status(200).send(results)
  } catch (error) {
    res.status(400).send(error)
  }
})

TestController.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await m$test.insertStudent(req.body)
    res.status(200).send(results)
  } catch (error) {
    res.status(401).send(error)
  }
})

TestController.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await m$test.updateStudent(req.body)
    res.status(200).send(results)
  } catch (error) {
    res.status(400).send(error)
  }
})

TestController.delete('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id: string = String(req.query.id)
    const results = await m$test.deleteStudent(id)

    res.status(200).send(results)
  } catch (error) {
    res.status(400).send(error)
  }
})

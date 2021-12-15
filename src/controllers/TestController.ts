import { NextFunction, Request, Response, Router } from 'express'
export const TestController: Router = Router()

TestController.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).send({ data: 'Hello from This is TestController!' })
  } catch (e) {
    next(e)
  }
})

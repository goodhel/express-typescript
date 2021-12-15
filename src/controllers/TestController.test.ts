import request from 'supertest'
import { app } from '../app'

/* eslint-disable no-undef */
describe('Test TestController', () => {
  it('Request /test should return Hello from This is TestController!', async () => {
    const result = await request(app).get('/test').send()

    expect(result.status).toBe(200)
    expect(result.body.data).toBe('Hello from This is TestController!')
  })
})

import request from 'supertest'
import { createServer } from '../app'
import { connect, Close } from '../db/conn'

/* eslint-disable no-undef */
describe('Get /test', () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(() => {
    Close.close()
  })

  it('Response with json', async () => {
    const app = createServer()
    await request(app).get('/test').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200)
  })
})

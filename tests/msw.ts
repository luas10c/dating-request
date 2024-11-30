import { beforeAll, beforeEach, afterAll } from '@jest/globals'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'

const handlers = [
  http.get('http://localhost:7000/', async function () {
    return HttpResponse.json({ message: 'Hello, World!' })
  })
]

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

beforeEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

import '@testing-library/jest-dom'
import { beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { cleanup } from '@testing-library/react'


// Configure MSW server
export const server = setupServer(...handlers)


beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => {
server.resetHandlers()
cleanup()
})
afterAll(() => server.close())
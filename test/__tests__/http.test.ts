import { describe, it, expect } from 'vitest'
import { api } from '../../lib/reqres'


// TDD: Define expected API behavior before implementing


describe('HTTP service (reqres)', () => {
it('logs in and returns a token', async () => {
const res = await api.login({ email: 'eve.holt@reqres.in', password: 'cityslicka' })
expect(res).toHaveProperty('token')
expect(typeof res.token).toBe('string')
})


it('registers and returns a token', async () => {
const res = await api.register({ email: 'eve.holt@reqres.in', password: 'pistol' })
expect(res).toHaveProperty('token')
expect(typeof res.token).toBe('string')
})


it('fetches users array', async () => {
const res = await api.getUsers(1)
expect(Array.isArray(res.data)).toBe(true)
})
})
import { http, HttpResponse } from 'msw'


const API = 'https://reqres.in/api'


export const handlers = [
// LOGIN
http.post(`${API}/login`, async ({ request }) => {
type AuthRequestBody = { email: string; password: string };
const body = (await request.json()) as AuthRequestBody
if (body?.email && body?.password) {
return HttpResponse.json({ token: 'mock-token' }, { status: 200 })
}
return HttpResponse.json({ error: 'Login failed' }, { status: 400 })
}),


// REGISTER
http.post(`${API}/register`, async ({ request }) => {
const body = (await request.json()) as any
if (body?.email && body?.password) {
return HttpResponse.json({ id: 1, token: 'mock-token' }, { status: 200 })
}
return HttpResponse.json({ error: 'Register failed' }, { status: 400 })
}),


// USERS LIST
http.get(`${API}/users`, ({ request }) => {
const url = new URL(request.url)
const page = url.searchParams.get('page') ?? '1'
const users = [
{ id: 1, first_name: 'Eve', last_name: 'Holt', email: 'eve@reqres.in', avatar: '' },
{ id: 2, first_name: 'Charles', last_name: 'Morris', email: 'charles@reqres.in', avatar: '' },
]
return HttpResponse.json({ page, data: users }, { status: 200 })
})
]
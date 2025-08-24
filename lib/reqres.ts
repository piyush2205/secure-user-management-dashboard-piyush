import { http } from './http'

export type LoginPayload = {email: string; password: string }
export type RegisterPayload = { email: string; password: string }

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export const api = {
  async login() {
    const { data } = await http.post('/login',{
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  })
    return data
  },
  async register() {
    const { data } = await http.post('/register',  {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  })
    return data
  },
  async getUsers(page = 1): Promise<{ data: User[] }> {
    const { data } = await http.get(`/users`, { params: { page } })
    return data
  },
}

export const loginUser = api.login
export const registerUser =api.register
export const reqres =api.getUsers
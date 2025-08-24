// src/services/http.ts
import axios from "axios"

export const http = axios.create({
  baseURL: "https://reqres.in/api",
  headers: { 
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1"  ,
  }
  
})

// Attach token if present
// http.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token")
//   if (token) {
//     config.headers = config.headers ?? {}
//     config.headers["Authorization"] = `Bearer ${token}`
//   }
//   return config
// })

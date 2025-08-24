// src/pages/Dashboard.tsx
import { useEffect, useState } from "react"
import { reqres } from "../lib/reqres"
import type { User } from "../features/auth/types"

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await reqres(1)
        setUsers(res.data)
      } catch (err) {
        console.error("Failed to fetch users:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="border p-2 rounded flex items-center gap-2"
            >
              <img
                src={u.avatar}
                alt={u.first_name}
                className="w-10 h-10 rounded-full"
              />
              <span>
                {u.first_name} {u.last_name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

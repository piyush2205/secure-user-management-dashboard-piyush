import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { registerUser } from "../lib/reqres"
import Input from "../components/ui/input"
import Button from "../components/ui/Button"
import MyAlert from "../components/ui/MyAlert"


export default function SignUp() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [name,setName] =useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res=await registerUser()
       console.log(res)
       localStorage.setItem("token",res.token)

       await login(email, password) // directly log user in after registration
      navigate("/dashboard")
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to register. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        {error && (
        //   <p className="text-red-500 text-sm text-center">{error}</p>
          <MyAlert  message={error} />
        )}
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing up..." : "Sign Up"}
        </Button>

        <p className="text-sm text-center text-black  mt-2">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 cursor-pointer bg-transparent border-none p-0"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  )
}

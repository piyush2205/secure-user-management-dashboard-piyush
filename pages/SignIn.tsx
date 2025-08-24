import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { loginUser } from "../lib/reqres"
import Input from "../components/ui/input"
import Button from "../components/ui/Button"
import MyAlert from "../components/ui/MyAlert"

export default function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const response = await loginUser()
      console.log(response)
     const storedToken = localStorage.getItem("token");

    if (response.token === storedToken) {
      // Token matches what was stored during registration
      login(response.token, password); // update redux/auth state
      navigate("/dashboard");
    } else {
      setError("Token mismatch. Please register first.");
    }
    } catch {
      setError("Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Sign In</h1>

        {error && (
        //   <p className="text-red-500 text-sm text-center">{error}</p>
          <MyAlert message={error} />
        )}

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
          {loading ? "Please wait..." : "Sign In"}
        </Button>

        <p className="text-sm text-center text-black mt-2">
          Don’t have an account?{" "}
          <button
            type="button"
            className="text-blue-600 cursor-pointer bg-transparent border-none p-0 "
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  )
}

import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }

export default function Button({ loading, children, className = '', ...rest }: Props) {
  return (
    <button
      className={`px-4 py-2 rounded-2xl shadow-sm font-medium disabled:opacity-60 bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}
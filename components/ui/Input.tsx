import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }

export default function Input({ label, error, className = '', ...rest }: Props) {
  return (
    <label className="block space-y-1">
      {label && <span className="text-sm font-medium">{label}</span>}
      <input
        className={`w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  )
}
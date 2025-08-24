import type { ReactNode } from 'react'

type ModalRootProps = { open: boolean; onClose: () => void; children: ReactNode }
export function ModalRoot({ open, onClose, children }: ModalRootProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-4 shadow-xl">
        {children}
      </div>
    </div>
  ) 
}

export function ModalHeader({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-lg font-semibold">{children}</div>
}

export function ModalBody({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>
}

export function ModalFooter({ children }: { children: ReactNode }) {
  return <div className="flex justify-end gap-2">{children}</div>
}

// Usage mimics named slots:
// <ModalRoot open onClose={...}>
//   <ModalHeader>Title</ModalHeader>
//   <ModalBody>Content</ModalBody>
//   <ModalFooter>Actions</ModalFooter>
// </ModalRoot>
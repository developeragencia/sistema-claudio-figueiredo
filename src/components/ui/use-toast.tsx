
import * as React from "react"

import {
  Toast,
  ToastAction,
} from "@/components/ui/toast"

type ToastActionElement = React.ReactElement<typeof ToastAction>

export const TOAST_VARIANTS = ["default", "destructive", "success", "warning", "info"] as const;

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: (typeof TOAST_VARIANTS)[number];
};

type ContextType = {
  toast: (props: Omit<ToastProps, "id"> & { id?: string }) => {
    id: string
    dismiss: () => void
    update: (props: ToastProps) => void
  }
  dismiss: (toastId?: string | undefined) => void
  toasts: Map<string, ToastProps>
  update: (id: string, toast: ToastProps) => void
}

const ToastContext = React.createContext<ContextType>({
  toast: () => {
    return {
      id: "",
      dismiss: () => {},
      update: () => {},
    }
  },
  dismiss: () => {},
  toasts: new Map(),
  update: () => {},
})

type ToastProviderProps = {
  children: React.ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const { toasts, dismiss, toast, update } = useSonner()

  const contextValue: ContextType = {
    toast,
    dismiss,
    toasts,
    update,
  }

  return (
    <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>
  )
}

function useToast() {
  return React.useContext(ToastContext)
}

function useSonner() {
  const [toasts, setToasts] = React.useState<Map<string, ToastProps>>(new Map())

  const dismiss = React.useCallback((toastId?: string) => {
    setToasts((toasts) => {
      const newToasts = new Map(toasts)
      if (toastId) {
        newToasts.delete(toastId)
      } else {
        newToasts.clear()
      }
      return newToasts
    })
  }, [])

  const toast = React.useCallback(
    (props: Omit<ToastProps, "id"> & { id?: string }) => {
      const id = props.id || String(Date.now())
      const update = (props: ToastProps) => {
        setToasts((toasts) => {
          const newToasts = new Map(toasts)
          newToasts.set(id, { ...newToasts.get(id), ...props })
          return newToasts
        })
      }

      setToasts((toasts) => {
        const newToasts = new Map(toasts)
        newToasts.set(id, { ...props, id, onOpenChange: (open) => {
          if (!open) dismiss(id)
        } })
        return newToasts
      })

      return {
        id,
        dismiss: () => dismiss(id),
        update,
      }
    },
    [dismiss]
  )

  const update = React.useCallback((id: string, toast: ToastProps) => {
    setToasts((toasts) => {
      const newToasts = new Map(toasts)
      newToasts.set(id, { ...newToasts.get(id), ...toast })
      return newToasts
    })
  }, [])

  return {
    toasts,
    dismiss,
    toast,
    update,
  }
}

export { ToastProvider, useToast }

import { Suspense } from "react"
import { AppRoutes } from "./routes"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

function App() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
      </Suspense>
    </div>
  )
}

export default App

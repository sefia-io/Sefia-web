import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/SignIn"
import InitializationGuard from "./components/Guard/InitializationGuard"
import GetStarted from "./pages/GetStarted"
import ServerStatusGuard from "./components/Guard/ServerStatusGuard"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <ServerStatusGuard>
          <InitializationGuard>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/signin" element={<LoginPage />} />
            </Routes>
          </InitializationGuard>
        </ServerStatusGuard>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

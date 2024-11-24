import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/SignIn"
import InitializationGuard from "./components/Guard/InitializationGuard"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <InitializationGuard>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<LoginPage />} />
          </Routes>
        </InitializationGuard>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

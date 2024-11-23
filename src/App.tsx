import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "./components/mode-toggle"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home"
import LoginPage from "./pages/Login"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <ModeToggle></ModeToggle>
    </ThemeProvider>
  )
}

export default App

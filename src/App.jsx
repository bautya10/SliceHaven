import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import NavBar from "./components/General/NavBar/NavBar"
import Register from "./pages/register/Register"
import Error404 from "./pages/error/Error404"
import { useEffect, useState } from "react"

function App() {

  const [user, setUser] = useState(null)
  useEffect(() => {
    const userStorage = localStorage.getItem("user")
    if (userStorage) {
      setUser(userStorage)
    }

  }, [])

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/registrar" element={<Register/>} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

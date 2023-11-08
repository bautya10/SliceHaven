import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import NavBar from "./components/General/NavBar/NavBar"
import Register from "./pages/register/Register"
import Error404 from "./pages/error/Error404"
import Login from "./pages/login/Login"
import LogOut from "./components/Specific/logOut/logOut"
import { useState, useEffect } from "react"

function App() {

  const [user, setUser] = useState(false);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) {
      setUser(userStorage);
    }
  }, []);

  return (
    <BrowserRouter>
      <NavBar user={user}/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/*" element={<Error404 />} />
        <Route path="/cerrarSesion" Component={LogOut}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

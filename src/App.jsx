import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import NavBar from "./components/General/NavBar/NavBar"

function App() {

  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" Component={Home}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

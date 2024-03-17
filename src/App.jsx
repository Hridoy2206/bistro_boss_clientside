import { Outlet } from "react-router-dom"
import Navbar from "./shared/Navbar"
import Footer from "./shared/Footer"
import { useContext } from "react"
import { StateContext } from "./provider/GlobalStateManagment"

function App() {
  const { setNavbarToggle } = useContext(StateContext);

  const handleToggle = () => {
    setNavbarToggle(false)
  }
  return (
    <div className="">
      <Navbar />
      <div onClick={handleToggle}>
        <Outlet />
      </div>
      <Footer />
    </div>

  )
}

export default App

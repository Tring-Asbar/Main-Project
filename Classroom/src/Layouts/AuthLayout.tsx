import { Outlet } from "react-router-dom"
import Header from "../HomePage/Header/Header"
import Footer from "../HomePage/Footer/Footer"

const AuthLayout = () => {
  return (
    <div>
      <Header/>
        <Outlet/>
      <Footer/>
    </div>
  )
}

export default AuthLayout
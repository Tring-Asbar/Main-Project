import { Outlet } from "react-router-dom"
import Header from "../../HomePage/Header/Header"
import Footer from "../../HomePage/Footer/Footer"
// import Content from "../../HomePage/Content/Content"
// import LandingPage from "../../HomePage/LandingPage/Landingpage"


const AuthLayout = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default AuthLayout
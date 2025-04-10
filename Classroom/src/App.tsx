import './App.scss'
import { Route,Navigate, Routes } from 'react-router-dom'
import AuthLayout from './Layouts/Auth/AuthLayout'
import { publicRoutes } from './Routes/PublicRoutes'
import { privateRoutes } from './Routes/PrivateRoutes'
import HomePage from './HomePage/HomePage'
import DashboardLayout from './Layouts/Dashboard/DashboardLayout'
import Content from './HomePage/Content/Content'
import ProtectedRoutes from './Routes/ProtectedRoutes'
import SplashScreen from './HomePage/SplashScreen/SplashScreen'
import { getAccessTokenFromLocalStorage } from './main'

function App() {
  
  const isAuthenticated = getAccessTokenFromLocalStorage()
  
  return (
    <Routes>
      <Route path='/' element={<HomePage/>}>
      <Route index element = {<Content/>}/>
      </Route>
      <Route element = {<AuthLayout/>}>
        {publicRoutes.map((route)=>(
          <Route 
          key={route.path}
          path={route.path}
          element = {
            isAuthenticated && (route.path === "/admin-login" || route.path==='/') ? (
              <Navigate to='/admin-dashboard' replace /> 
            ) : (
              route.element
            )
          }
          />
        ))}
      </Route>
      <Route element={<DashboardLayout/>}>
        {privateRoutes.map((route)=>(
          <Route 
          key={route.path}
          path={route.path}
          element = 
          {
          <ProtectedRoutes>
            {route.element}
          </ProtectedRoutes>
          }
          />
        ))}
      </Route>
    </Routes>
  )
}

export default App

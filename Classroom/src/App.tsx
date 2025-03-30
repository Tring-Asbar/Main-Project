import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './Layouts/Auth/AuthLayout'
import { publicRoutes } from './Routes/PublicRoutes'
import { privateRoutes } from './Routes/PrivateRoutes'
import HomePage from './HomePage/HomePage'
import DashboardLayout from './Layouts/Dashboard/DashboardLayout'
import Content from './HomePage/Content/Content'

function App() {
  
  
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
          element = {route.element}
          />
        ))}
      </Route>
      <Route element={<DashboardLayout/>}>
        {privateRoutes.map((route)=>(
          <Route 
          key={route.path}
          path={route.path}
          element = {route.element}
          />
        ))}
      </Route>
    </Routes>
  )
}

export default App

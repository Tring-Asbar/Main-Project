import './App.scss'
import { Route, Routes } from 'react-router-dom'
import AuthLayout from './Layouts/AuthLayout'
import Login from './Login/Login'
import HomePage from './HomePage/HomePage'

function App() {
  
  const publicRoutes = [
    {path:'/login',element:<Login/>}
  ]

  return (
    <Routes>
      <Route path='/' element=<HomePage/>></Route>
      <Route element = {<AuthLayout/>}>
      {publicRoutes.map((route)=>(
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

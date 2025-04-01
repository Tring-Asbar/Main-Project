import { Navigate} from 'react-router-dom';

type ProtectedRoutesProps = {
    children: React.ReactNode;
  };
  
const ProtectedRoutes:React.FC<ProtectedRoutesProps> = ({children}) => {
    const isAuthenticated = localStorage.getItem('loginpage');
  return (
    isAuthenticated?children:<Navigate to="/admin-login" />
  )
}

export default ProtectedRoutes
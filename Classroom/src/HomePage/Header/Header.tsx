import Logo from '../../assets/Images/Header/KATON_Logo.svg'
import '../Header/Header.scss'
import { useNavigate,Link } from "react-router-dom"

const Header = () => {

  const navigate = useNavigate()
  const path = '/admin-login'

  const contents = [
    {path,label: "School Admin"},
    {path,label: "Teacher"},
    {path,label: "PTA"},
  ]
  
  

  return (
    <div className="header">
      <div className="header_logo">
        <img src={Logo} alt="Katon" onClick={()=>navigate('/')}/>
      </div>
      <div className="header_content">
          {contents.map((content)=>(
            <div key={content.path} className="content {}" >
              <Link to={content.path}>
                {content.label}
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Header

import { Link } from "react-router-dom"
import Logo from '../../assets/Images/Header/KATON_Logo.svg'
import '../Header/Header.scss'
import { useNavigate } from "react-router-dom"

const Header = () => {

  const navigate = useNavigate()

  const contents = [
    {path:'/login',label: "School Admin"},
    {path:'/login',label: "Teacher"},
    {path:'/login',label: "PTA"},
  ]

  return (
    <div className="header">
      <div className="header_logo">
        <img src={Logo} alt="Katon" onClick={()=>navigate('/')}/>
      </div>
      <div className="header_content">
          {contents.map((content)=>(
            <div key={content.path} className="content">
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
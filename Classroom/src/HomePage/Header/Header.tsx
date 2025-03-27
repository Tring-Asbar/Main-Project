import { Link } from "react-router-dom"
import Logo from '../../assets/Logo/KATON_Logo.svg'
import '../Header/Header.scss'

const Header = () => {
  const contents = [
    {path:'/login',label: "School Admin"}
  ]

  return (
    <div className="header">
      <div>
        <img src={Logo} alt="" />
      </div>
      <div>
        <ul>
          {contents.map((content)=>(
            <li key={content.path}>
              <Link to={content.path}>
                <span>
                  {content.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Header
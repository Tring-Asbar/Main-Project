import { Link } from "react-router-dom"
import { signOut } from "aws-amplify/auth"
import { useNavigate } from "react-router-dom"
import './Sidebar.scss'
const Sidebar = () => {

    const navigate = useNavigate();

    const sidebarMenu = [
        
        {
            path:'/admin-dashboard',
            label:'Dashboard'
        },
        {
            path:'/admin-workshop',
            label:'Workshop'
        },
        {
            path:'/admin-notification',
            label:'Notification'
        },
        {
            path:'/admin-system-message',
            label:'System Messages'
        },
        {
            path:'/admin-settings',
            label:'Settings'
        },
        {
            path:'/admin-help',
            label:'Help'
        }
    ]

    const handleLogout = async() =>{
        try{
            await signOut();
            console.log("Logout");
            navigate('/admin-login');
        }
        catch(err){
            console.error(err);
        }
        
    }

  return (
    <div className="sidebar-container">
        <div className="sidebar-header">
        </div>
        <div className="sidebar-section">
            <div className="section">School</div>
            <div className="section">Calendar</div>
        </div>
        <div className="sidebar-menu">
            {sidebarMenu.map((menu)=>(
                <div key={menu.path} className="menu">
                    <Link to={menu.path}>
                    {menu.label}
                    </Link>
                </div>
            ))}
            <div onClick={handleLogout} className="logout">Logout</div>
        </div>
    </div>
  )
}

export default Sidebar
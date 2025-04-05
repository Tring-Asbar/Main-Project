import { signOut } from "aws-amplify/auth"
import { useState } from "react"
import { useNavigate , Link } from "react-router-dom"
import './Sidebar.scss'
import KatonSchool from '../../../assets/Images/Katon.svg'
import icon from '../../../assets/Images/MenuIcon/DashboardIcon.svg'
import { Dialog , DialogContent , DialogActions , Button } from "@mui/material"
import bg from '../../../assets/Images/Katon.svg'

const Sidebar = () => {

    const navigate = useNavigate();
    const [LogoutBtn,setLogoutBtn] = useState(false)

    const sidebarMenu = [
        
        {
            icon,
            path:'/admin-dashboard',
            label:'Dashboard'
        },
        {
            icon,
            path:'/admin-workshop',
            label:'Workshop'
        },
        {
            icon,
            path:'/admin-notification',
            label:'Notification'
        },
        {
            icon,
            path:'/admin-system-message',
            label:'System Messages'
        },
        {
            icon,
            path:'/admin-settings',
            label:'Settings'
        },
        {
            icon,
            path:'/admin-help',
            label:'Help'
        }
    ]
    
    const setLogoutBtnState = (value:boolean) =>{
        setLogoutBtn(value);
    }

    const logoutPopup = () =>{
        return(
            <div className="popup">
                <Dialog open={true} maxWidth='sm' sx={{borderRadius:'90px'}}>
                    {/* <img src={bg} alt="dbbb" width={100} height={100} style={{display:"flex",justifyContent:'center',alignItems:'center'}} /> */}
                    <DialogContent>
                        <p>Are you sure you want to Log Out?</p>
                    </DialogContent>
                    <DialogActions>
                        <Button sx={{display:'flex',justifyContent:'center',alignItems:'center'}} variant="contained" onClick={()=>handleLogout()} className="yes">Yes</Button>
                        <Button variant="contained" onClick={()=>setLogoutBtnState(false)} className="no" color="inherit">No</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    const handleLogout = async() =>{
        try{
            await signOut();
            localStorage.removeItem('loginpage')
            navigate('/');
        }
        catch(err){
            console.error(err);
        } 
    }

  return (
    <div className="sidebar-container">
        <div className="sidebar-header">
            <img src={KatonSchool}  alt="Image" />
            <h4>Katon School</h4>
        </div>
        

        <div className="sidebar-section">
            <div className="section" onClick={()=>navigate('/admin-school')}>
                <p>Customize</p>
                <p>School</p>
            </div>
            <div className="section">
                <p>Edit</p>
                <p>Calendar</p>
            </div>
        </div>
        <div className="sidebar-menu">
            {sidebarMenu.map((menu)=>(
                <div key={menu.path} className="menu">
                    <Link to={menu.path}>
                    {menu.label}
                    </Link>
                </div>
            ))}
            <div onClick={()=>setLogoutBtnState(true)} className="logout">Logout</div>
            {
                LogoutBtn && logoutPopup()
            }
        </div>
    </div>
  )
}

export default Sidebar

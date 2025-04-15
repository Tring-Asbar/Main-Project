import { signOut } from "aws-amplify/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Sidebar.scss';
import KatonSchool from '../../../assets/Images/Katon.svg';
import Dashboard from '../../../assets/Images/MenuIcon/Icon.svg'
import Workshop from '../../../assets/Images/MenuIcon/workshop.svg'
import Notification from '../../../assets/Images/MenuIcon/notification.svg'
import SysMsg from '../../../assets/Images/MenuIcon/sys-msg.svg'
import Settings from '../../../assets/Images/MenuIcon/settings.svg'
import Help from '../../../assets/Images/MenuIcon/help.svg'
import logout from '../../../assets/Images/MenuIcon/logout.svg'
import Logout from '../../../assets/Images/logout.gif'
import { Dialog } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "../../../graphql/query";
import Button from "../../../Components/customComponents/Button/Button";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutBtn, setLogoutBtn] = useState(false);
  const [isActive,setIsActive] = useState("")
  const navigate = useNavigate();

  const sidebarMenu = [
    { icon:Dashboard, path: '/admin-dashboard', label: 'Dashboard' },
    { icon:Workshop, path: '/admin-workshop', label: 'Workshop' },
    { icon:Notification, path: '/admin-notification', label: 'Notification' },
    { icon:SysMsg, path: '/admin-system-message', label: 'System Messages' },
    { icon:Settings, path: '/admin-settings', label: 'Settings' },
    { icon:Help, path: '/admin-help', label: 'Help' }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const logoutPopup = () => (
    <div className="popup">
      <Dialog open={true} className="dialogMainContainer" >
        <img src={Logout} alt="logout" />
          <p>Are you sure you want to Log Out?</p>
        <div className="buttons">

          <Button className="yes" action="Yes" onClick={handleLogout}/>
          <Button className="no" action="No" onClick={() => setLogoutBtn(false)}/>
        </div>
      </Dialog>
    </div>
  );

  const {data} =useQuery(CURRENT_USER)

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        {data?.getCurrentUser?.nodes?.map((user:any)=>
          (user?.schoolAdminsByUId?.nodes?.map((school:any)=>(
            <div className="logo">
              <img src={KatonSchool} alt="Katon School" />
              <h4>{school.saName}</h4>
            </div>
          )))
        )}
        
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon />
        </button>
      </div>

      <div className="sidebar-section">
        <div className="section" onClick={() => navigate('/admin-school')}>
          <p>Customize</p>
          <p>School</p>
        </div>
        <div className="section">
          <p>Edit</p>
          <p>Calendar</p>
        </div>
      </div>

      <div className="sidebar-menu">
        {sidebarMenu.map((menu) => (
          <div key={menu.path} className="menu">
            <img src={menu.icon} alt="icon"/>
            <Link to={menu.path} className={isActive===menu.label ? "active" : ""} onClick={()=>setIsActive(menu.label)}>{menu.label}</Link>
          </div>
        ))}
        <div onClick={() => setLogoutBtn(true)} className="logout"><img src={logout}/><p>Logout</p></div>
        {logoutBtn && logoutPopup()}
      </div>
    </div>
  );
};

export default Sidebar;

import { signOut } from "aws-amplify/auth";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Sidebar.scss';
import KatonSchool from '../../../assets/Images/Katon.svg';
import dashboard from '../../../assets/Images/MenuIcon/Icon.svg'
import workshop from '../../../assets/Images/MenuIcon/workshop.svg'
import notification from '../../../assets/Images/MenuIcon/notification.svg'
import sysMsg from '../../../assets/Images/MenuIcon/sys-msg.svg'
import settings from '../../../assets/Images/MenuIcon/settings.svg'
import help from '../../../assets/Images/MenuIcon/help.svg'
import logout from '../../../assets/Images/MenuIcon/logout.svg'
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoutBtn, setLogoutBtn] = useState(false);
  const navigate = useNavigate();

  const sidebarMenu = [
    { icon:dashboard, path: '/admin-dashboard', label: 'Dashboard' },
    { icon:workshop, path: '/admin-workshop', label: 'Workshop' },
    { icon:notification, path: '/admin-notification', label: 'Notification' },
    { icon:sysMsg, path: '/admin-system-message', label: 'System Messages' },
    { icon:settings, path: '/admin-settings', label: 'Settings' },
    { icon:help, path: '/admin-help', label: 'Help' }
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
      <Dialog open={true} maxWidth='sm'>
        <DialogContent>
          <p>Are you sure you want to Log Out?</p>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleLogout} className="yes">Yes</Button>
          <Button variant="contained" onClick={() => setLogoutBtn(false)} className="no" color="inherit">No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <img src={KatonSchool} alt="Katon School" />
          <h4>Katon School</h4>
        </div>
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
            <Link to={menu.path}>{menu.label}</Link>
          </div>
        ))}
        <div onClick={() => setLogoutBtn(true)} className="logout"><img src={logout}/><p>Logout</p></div>
        {logoutBtn && logoutPopup()}
      </div>
    </div>
  );
};

export default Sidebar;

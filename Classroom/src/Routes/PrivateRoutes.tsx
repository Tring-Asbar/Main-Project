import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AdminHelp from "../Pages/Admin/AdminHelp";
import AdminNotification from "../Pages/Admin/AdminNotification";
import AdminSettings from "../Pages/Admin/AdminSettings";
import AdminSystemMessages from "../Pages/Admin/AdminSystemMessages";
import AdminWorkshop from "../Pages/Admin/AdminWorkshop";

export const privateRoutes = [
    {
        path:'/admin-dashboard',
        element :<AdminDashboard/>
    },
    {
        path:'/admin-workshop',
        element :<AdminWorkshop/>
    },
    {
        path:'/admin-notification',
        element :<AdminNotification/>
    },
    {
        path:'/admin-system-message',
        element :<AdminSystemMessages/>
    },
    {
        path:'/admin-settings',
        element :<AdminSettings/>,
    },
    {
        path:'/admin-help',
        element :<AdminHelp/>
    },
]
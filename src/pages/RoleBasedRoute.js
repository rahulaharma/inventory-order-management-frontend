import { useAuth } from "./useAuth"
import { Navigate,Outlet } from "react-router-dom"

const RoleBasedRoute=({allowedRoles})=>{
    const {user}=useAuth()
    return allowedRoles.includes(user?.role)?<Outlet />:<Navigate to="/" />
}
export default RoleBasedRoute
import { useAuth } from "./useAuth"

const RoleBasedRoute=({allowedRoles})=>{
    const {user}=useAuth()
    return allowedRoles.includes(user?.role)?<Outlet />:<Navigate to="/" />
}
export default RoleBasedRoute
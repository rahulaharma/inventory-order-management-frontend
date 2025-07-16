import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { AuthContext } from "./AuthContext"

const AuthProvider=({children})=>{
    const [user,setUser]=useState(()=>{
        const token=localStorage.getItem('token')
        if(token){
            const decodedToken=jwtDecode(token)
            return {role:decodedToken.role}
        }
        else{
            return null
        }
    })

    const login=(token)=>{
        localStorage.setItem('token',token)
        const decodedToken = jwtDecode(token);
        setUser({role: decodedToken.role});
    }

    const logout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('userRole')
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
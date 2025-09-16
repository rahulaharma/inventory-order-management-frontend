import { jwtDecode } from "jwt-decode"
import { useState } from "react"
import { AuthContext } from "./AuthContext"

const AuthProvider=({children})=>{
    const [user,setUser]=useState(()=>{
        const token=localStorage.getItem('token')
        if(token){
            try{
                const decodedToken=jwtDecode(token)
                if (decodedToken.exp *1000<Date.now()) {
                    localStorage.removeItem('token');
                    return null;
                }
            
            return {role:decodedToken.role}
            }
             catch (error) {
                localStorage.removeItem('token');
                return null;
            }
        }
        return null;
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
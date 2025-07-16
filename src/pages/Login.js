import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./useAuth";

const Login=()=>{

    const navigate=useNavigate()
    const {login}=useAuth()
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [loading,setLoading]=useState(false)

    const handleSubmit=async(event)=>{
        event.preventDefault()
        setLoading(true)

        try{
            const {data}=await api.post("/login",{userName,password})
            const {token}=data
            login(token)
            navigate('/',{replace:true})
        }
        catch(error){
            toast.error('Login failed')
        }
        finally{
            setLoading(false)
        }
    }

    return(
         <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h1>
                <p className="mt-2 text-center text-sm text-gray-600">Sign in to continue</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                         <label className="block text-sm font-medium text-gray-700">Username</label>
                         <input type="text" value={userName} onChange={event => setUserName(event.target.value)} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                    <p className="text-sm text-center text-gray-500">
                        Don't have an account? <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Register</Link>
                    </p>
                </form>
            </div>
         </div>
    )
}

export default Login
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api";

const Register=()=>{
    const navigate=useNavigate()
    const [userName,setuserName]=useState('')
    const [password,setPassword]=useState('')
    const [selectedRole,setSelectedRole]=useState('SALESSTAFF')
    const [loading,setLoading]=useState(false)

    const handleSubmit=async(event)=>{
        event.preventDefault()
        setLoading(true)
        const registerationPayLoad={
            username:userName,
            password:password,
            // If it needs an ID, you would map this name to an ID.
            role:{
                name:selectedRole
            }
        }

        try{
            await api.post('/register',registerationPayLoad)
            toast.success("Registration successful! Please log in.")
            navigate('/login')
        }
        catch(error){
            toast.error("Registration failed!")
        }
        finally{
            setLoading(false)
        }
    }

    const roleButtonStyle=(role)=>
        `px-8 py-3 rounded-md w-full text-center font-semibold transition-colors duration-300 ${
            selectedRole===role 
            ?'bg-indigo-600 text-white shadow-lg' 
            :'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`
        
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-xl">
                <div>
                    <h1 className="text-3xl font-bold text-center text-gray-800">Create Your Account</h1>
                    <p className="mt-2 text-center text-sm text-gray-600">Join our platform to manage your business.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">I am a...</p>
                        <div className="flex space-x-4">
                            <button type="button" onClick={()=>setSelectedRole('SALESSTAFF')} className={roleButtonStyle('SALESSTAFF')}>
                                Sales Staff
                            </button>
                            <button type="button" onClick={() => setSelectedRole('WAREHOUSESTAFF')} className={roleButtonStyle('WAREHOUSESTAFF')}>
                                Warehouse Staff
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" value={userName} onChange={(event)=>setuserName(event.target.value)} required className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} required className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                        {loading ? 'Registering...' : 'Get Started'}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500">
                    Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;
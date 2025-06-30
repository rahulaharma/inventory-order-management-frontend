import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router";
import { toast } from "react-toastify";
import { api } from "../services/api";

const CustomerForm=()=>{
    const [customer,setCustomer]=useState({name:"",email:"",phone:"",address:""})
    const navigate=useNavigate();
    const {id}=useParams();
    const isEditing=Boolean(id)

    useEffect(()=>{
        if(isEditing){
            fetchCustomer()
        }
    },[id,isEditing,navigate])

    const fetchCustomer=async()=>{
        try{
            const response=await api.get(`/customers/${id}`)
            setCustomer(response.data)
        }
        catch(error){
            toast.error('Customer is not found')
            navigate('/customers')
        }
    }

    const handleSubmit=async(event)=>{
        event.preventDefault()
        try{
            if(isEditing){
                await api.put(`/customers/${id}`,customer)
                toast.success('Customer updated successfully!')
            }
            else{
                await api.post('/customers',customer)
                toast.success('Customer created successfully!')
            }
            navigate("/customers")
        }
        catch{
            toast.error(`Failed to ${isEditing?'update':'create'} customer`)
        }
    }

    const handleChange=(event)=>{
        setCustomer({...customer,[event.target.name]:event.target.value})
    }
    return(
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditing?'Edit Customer':'Add New Customer'}</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" name="name" id="name" value={customer.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                        </div>
                        
                        <div className="col-span-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="email" id="email" value={customer.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="tel" name="phone" id="phone" value={customer.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" name="address" id="address" value={customer.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                        </div>
                        
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button type="button" onClick={() => navigate('/customers')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 mr-3">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">{isEditing ?'Update Customer':'Save Customer'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CustomerForm
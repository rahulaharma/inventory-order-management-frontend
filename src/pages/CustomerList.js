import { useEffect,useState } from "react";
import { toast } from "react-toastify";
import { Link} from "react-router-dom";
import { PlusIcon,PencilIcon,TrashIcon } from "@heroicons/react/16/solid";
import { api} from "../services/api";

const CustomerList=()=>{
    const [customers,setCustomers]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        fetchCustomers()
    },[])

    const fetchCustomers=async()=>{
        setLoading(true)
        try{
            const response= await api.get('/customers')
            setCustomers(response.data)
        }
        catch(error){
            toast.error("Failed to load customers data")
        }
        finally{
            setLoading(false)
        }
    }

    const handleDelete= async(customerId)=>{
        if(window.confirm('Are you sure you want to delete the customer?')){
            try{
                await api.delete(`/customers/${customerId}`)
                toast.success("Customer deleted successfully!")
                fetchCustomers()
            }
            catch(error){
                toast.error("Faild to delete the customer ")
            }
        }
    }

    if(loading){
        return <p className="p-4 text-center text-gray-500">Loading Customers...</p>;
    }

    return (
         <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
                <Link to='/customers/new' className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                    <PlusIcon className="h-5 w-5 mr-2" />
                     Add Customer
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                         <tr>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                         </tr>
                     </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {customers.map((customer)=>(
                            <tr key={customer.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.address}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-4">
                                        <Link to={`/customers/edit/${customer.id}`} className="text-indigo-600 hover:text-indigo-900">
                                            <PencilIcon className="h-5 w-5"/>
                                        </Link>
                                        <button onClick={()=>handleDelete(customer.id)} className="text-red-600 hover:text-red-900">
                                            <TrashIcon className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CustomerList
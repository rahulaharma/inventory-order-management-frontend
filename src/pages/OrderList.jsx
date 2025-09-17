import { useEffect,useState } from "react";
import { PlusIcon,EyeIcon } from "@heroicons/react/16/solid";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

const OrderList=()=>{
    const [orders,setOrders]=useState([])
    const [loading,setLoading]=useState(true)

    const fetchOrders=async()=>{
        setLoading(true)
        try{
            const response=await api.get('/orders')
            setOrders(response.data)
        }
        catch(error){
             toast.error('Failed to fetch orders.')
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchOrders()
    },[])

    const getStatusClass=(status)=>{
        console.log(status)
        switch(status.replace(/"/g, '').toUpperCase()){

            case "SHIPPED":
                return 'bg-green-100 text-green-800'
            case "PACKED":
                return 'bg-blue-100 text-blue-800'
            case "NEW":
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

     if (loading) {
        return <p className="p-4 text-center text-gray-500">Loading orders...</p>
    }
    return(
         <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                  <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
                   <Link to='/orders/new' className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create Order
                   </Link>
            </div>
             <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                         <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salesperson</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                         </tr>
                     </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order)=>(
                             <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer?.name || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.salesPerson?.username || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(order.status)}`}>
                                        {order.status || 'UNKNOWN'}
                                    </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link to={`/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end">
                                        <EyeIcon className="h-5 w-5 mr-1" />
                                        View Details
                                    </Link>
                                </td>
                             </tr>
                        ))}
                    </tbody>
                </table>
             </div>
         </div>
    )
}

export default OrderList
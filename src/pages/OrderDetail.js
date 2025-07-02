import { useState,useEffect } from "react";
import { useParams,Link,useNavigate } from "react-router";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

const OrderDetail=()=>{
    const [order,setOrder]=useState(null)
    const [loading,setLoading]=useState(true)
    const [status,setStatus]=useState('')
    const {id}=useParams()
    const navigate=useNavigate()

    useEffect(()=>{
        if(id){
            fetchOrder()
        }

    },[id,navigate])

    const fetchOrder=async()=>{
        setLoading(true)
        try{
            const orderResponse=await api.get(`/orders/${id}`)
            setOrder(orderResponse.data)
            setStatus(orderResponse.data.status)
        }
        catch(error){
             toast.error("Failed to fetch order details.")
             navigate('/orders')
        }
        finally{
            setLoading(false)
        }
    }

    const handleStatusUpdate=async()=>{
        try{
            await api.put(`/orders/${id}/status`,`${status}`)
            toast.success('Order status updated successfully')
            setOrder((prevOrder)=>({...prevOrder,status:status}))

        }
        catch{
            toast.error('Failed to update order status')
        }
    }

    if (loading) {
        return <p className="p-4 text-center text-gray-500">Loading order details...</p>
    }

    return(
        <div className="container mx-auto">
            <div className="mb-6">
                <Link to="/orders" className="text-indigo-600 hover:underline flex items-center">
                    <ArrowLeftIcon className="h-4 w-4 mr-2" />
                    Back to All Orders
                </Link>
            </div>

             <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                 <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Details #{order.id}</h1>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Customer</h2>
                        <p className="text-lg text-gray-800">{order.customer?.name || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{order.customer?.email}</p>

                    </div>

                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Salesperson</h2>
                         <p className="text-lg text-gray-800">{order.salesPerson?.username || 'N/A'}</p>
                    </div>

                    <div>
                        <h2 className="text-sm font-medium text-gray-500">Order Date</h2>
                        <p className="text-lg text-gray-800">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>

                     <div className="flex flex-col">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                        <div className="flex">
                             <select id="status" value={status} onChange={(e)=>setStatus(e.target.value)} className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                                <option>NEW</option>
                                <option>PACKED</option>
                                <option>SHIPPED</option>
                             </select>
                             <button onClick={handleStatusUpdate} className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700">
                                 Update
                             </button>
                        </div>
                     </div>
                 </div>
             </div>

              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                 <h2 className="text-xl font-semibold text-gray-700 p-4 border-b">Order Items</h2>
                 <table className="min-w-full">
                    <thead className="bg-gray-50">
                         <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Quantity</th>
                         </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {order.orderItems.map(item=>(
                             <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product?.name || 'Product not found'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.product?.sku || 'N/A'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">${(item.product?.price || 0).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{item.quantity}</td>
                             </tr>
                        ))}
                    </tbody>
                 </table>
              </div>
        </div>
    )
}

export default OrderDetail
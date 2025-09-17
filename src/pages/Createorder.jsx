import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { TrashIcon,PlusIcon } from "@heroicons/react/16/solid";

const Createorder=()=>{
    const navigate=useNavigate()

    const [customers,setCustomers]=useState([])
    const [products,setProducts]=useState([])
    const [users,setUsers]=useState([])
    const [selectedCustomerId,setselectedCustomerId]=useState('')
    const [selectedUserId,setSelectedUserId]=useState('')
    const [orderItems,setOrderItems]=useState([])
    const [selectedProductId,setselectedProductId]=useState('')
    const [quantity,setquantity]=useState(1)

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData=async()=>{
            try{
                const customersResponse=await api.get('/customers')
                const productsResponse=await api.get('/products')
                const usersResponse=await api.get('/users')
                setCustomers(customersResponse.data)
                setUsers(usersResponse.data)
                setProducts(productsResponse.data)
            }
            
            catch(error) {
                toast.error('Failed to load data needed to create an order')
            }
    }

    const handleAddItem=async()=>{
        if(!selectedProductId || quantity<=0){
            toast.warn('Please select a product and enter a valid quantity.')
            return;
        }

        try{
            const productToAdd=products.find(product=>product.id===parseInt(selectedProductId))
            const inventoryResponse=await api.get(`/inventory/product/${productToAdd.id}`)
            const availablequantity=inventoryResponse.data.quantityAvailable

            if(availablequantity<quantity){
                toast.error(`Not enough stock for product:${productToAdd.name}`)
                return
            }

            const existingItemIndex=orderItems.findIndex(item=>item.product.id===productToAdd.id)
            if(existingItemIndex>-1){
                const updatedItems=[...orderItems]
                updatedItems[existingItemIndex].quantity+=1
                setOrderItems(updatedItems)
            }
            else{
                setOrderItems([...orderItems,{product:productToAdd,quantity:quantity}])
            }

            setselectedProductId('');
            setquantity(1);
        }

        catch (error) {
            toast.error('Could not verify product availability.')
        }
    }

    const handleRemoveItem=(productId)=>{
        setOrderItems(orderItems.filter(item=>item.product.id!==productId))
    }

    const handleSubmitOrder=async()=>{
        if(!selectedCustomerId||!selectedUserId||orderItems.length==0){
            toast.error('A customer,a salesperson,and at least one item are required.')
            return;
        }

        const orderPayload={
            customer:{
                id:selectedCustomerId
            },
            salesPerson:{
                id:selectedUserId
            },
            status:'NEW',
            orderItems:orderItems.map((item)=>({
                product:{id:item.product.id},
                quantity:item.quantity
            }))
        }

        try{
            await api.post('/orders',orderPayload)
            toast.success('Order created successfully')
            navigate('/orders')
        }
        catch(error){
            toast.error('failed to create the order!')
        }
    }

    return(
        <div className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 pb-1.5">Create New Order</h1>
             <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Customer</label>
                        <select id="customer" value={selectedCustomerId} onChange={(e)=>setselectedCustomerId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                             <option value="">Select a Customer</option>
                            {customers.map(c =><option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                     </div>

                     <div>
                        <label htmlFor="salesperson" className="block text-sm font-medium text-gray-700">Salesperson</label>
                        <select id="salesperson" value={selectedUserId} onChange={(e)=>setSelectedUserId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="">Select a Salesperson</option>
                                {users.map(u =><option key={u.id} value={u.id}>{u.username}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add Products to Order</h2>
                <div className="flex items-end gap-4">
                    <div className="flex-grow">
                         <label htmlFor="product" className="block text-sm font-medium text-gray-700">Product</label>
                         <select id="product" value={selectedProductId} onChange={(e) => setselectedProductId(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option value="">Select a Product</option>
                            {products.map(p =><option key={p.id} value={p.id}>{p.name}</option>)}
                         </select>
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                        <input type="number" id="quantity" value={quantity} onChange={(e) => setquantity(parseInt(e.target.value, 10))} min="1" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <button onClick={handleAddItem} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                        <PlusIcon className="h-5 w-5 mr-1" /> Add Item
                    </button>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="text-xl font-semibold text-gray-700 p-4 border-b">Current Order Items</h2>
                 <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left">Product</th>
                            <th className="px-6 py-3 text-center">Quantity</th>
                            <th className="px-6 py-3 text-right">Subtotal</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.map((item)=>(
                            <tr key={item.product.id} className="border-t">
                                <td className="px-6 py-4">{item.product.name}</td>
                                <td className="px-6 py-4 text-center">{item.quantity}</td>
                                <td className="px-6 py-4 text-right">${(item.product.price*item.quantity).toFixed(2)}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleRemoveItem(item.product.id)} className="text-red-600 hover:text-red-900"><TrashIcon className="h-5 w-5" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </div>
            <div className="flex justify-end mt-6">
                <button onClick={handleSubmitOrder} className="bg-green-600 text-white font-bold px-6 py-3 rounded-md hover:bg-green-700 text-lg">Submit Order</button>
            </div>
        </div>
    )
}

export default Createorder

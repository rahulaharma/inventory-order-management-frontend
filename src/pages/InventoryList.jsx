import React, { useEffect, useState } from "react"
import { api } from "../services/api";
import { PlusIcon,ArrowPathIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const InventoryList=()=>{
    const [items,setItems]=useState([])
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        fetchInventory()
    },[])

    const fetchInventory=async()=>{
        try{
            const res=await api.get("/inventory")
            toast.success("Inventory fetched successfully!")
            setItems(res.data)
        }
        catch(error){
            toast.error("Error fetching inventory")
        }
        finally{
            setLoading(false)
        }
    }
    const reStockItem=async(item)=>{
        try{
            await api.put(item.id,{quantityAvailable:item.quantityAvailable+1})
            toast.success("Successfully updated!")
        }
        catch(error){
            toast.error("Failed to update inventory")
        }
        finally{
            setLoading(false)
        }
    }

    if (loading) {
        return<p className="p-4">Loading inventory...</p>;
    }
    return(
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Inventory</h1>
                <Link to="/products/new"className="bg-indigo-600 text-white px-3 py-2 rounded flex items-center">
                    <PlusIcon className="h-5 w-5 mr-1" />
                        Add Product
                </Link>
             </div>
            <table className="min-w-full bg-white shadow rounded">
                <thead className="bg-gray-50 text-left">
                    <tr>
                        <th className="p-3">Product</th>
                        <th className="p-3">SKU</th>
                        <th className="p-3">Quantity</th>
                        <th className="p-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item)=>(
                        <tr key={item.id} className="border-t">
                            <td className="p-3">{item.product.name}</td>
                            <td className="p-3">{item.product.sku}</td>
                            <td className="p-3">{item.quantityAvailable}</td>
                            <td className="p-3 text-right">
                                <button onClick={() =>reStockItem(item)}className="inline-flex items-center px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700">
                                    <ArrowPathIcon className="h-4 w-4 mr-1" />
                                    Restock
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default InventoryList

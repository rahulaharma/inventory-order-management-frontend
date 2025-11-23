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
            const newQuantity = item.quantityAvailable + 1;
            await api.put(`/inventory/product/${item.product.id}`, newQuantity, {
                headers: { 'Content-Type': 'application/json' }
            });
            toast.success("Successfully updated!");
            fetchInventory(); 
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
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Inventory</p>
                    <h1 className="text-3xl font-black text-slate-900">Stock levels</h1>
                </div>
                <Link
                    to="/products/new"
                    className="inline-flex items-center rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:from-indigo-600 hover:to-indigo-700"
                >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    Add Product
                </Link>
             </div>
            <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/95 shadow-2xl">
            <table className="min-w-full text-left text-slate-700">
                <thead className="bg-slate-100/90 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <tr>
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">SKU</th>
                        <th className="px-6 py-3">Quantity</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-base font-medium text-slate-800">
                    {items.map((item)=>(
                        <tr key={item.id} className="transition hover:bg-slate-50/80">
                            <td className="px-6 py-4 text-slate-900">{item.product.name}</td>
                            <td className="px-6 py-4 text-slate-600">{item.product.sku}</td>
                            <td className="px-6 py-4 text-slate-900">{item.quantityAvailable}</td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={() =>reStockItem(item)}className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                                    <ArrowPathIcon className="h-4 w-4 mr-1" />
                                    Restock
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default InventoryList

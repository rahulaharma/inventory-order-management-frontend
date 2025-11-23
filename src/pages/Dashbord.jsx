
import { useState,useEffect } from "react";
import { api } from "../services/api";
import { useAuth } from "./useAuth";

const DashBoard=()=>{
    const {user} = useAuth()
    const [stats,setStats]=useState({
         products: 0,
         orders: 0,
         customers: 0,
    })
    useEffect(()=>{
        const fetchStats=async()=>{
            if (!user) return;
            try{
                const productsResponse=await api.get("/products")
                const totalProducts=productsResponse.data.length
                if (user.role.toUpperCase() === 'WAREHOUSESTAFF') {
                    setStats({ products: totalProducts, orders: 0, customers: 0 });
                }
                else{
                  const ordersResponse=await api.get("/orders")
                  const customersResponse=await api.get("/customers")
                  const totalOrders=ordersResponse.data.length;
                  const totalCustomers=customersResponse.data.length;
                  setStats({
                    products: totalProducts,
                    orders: totalOrders,
                    customers: totalCustomers
                  });
                }
                
            }
            catch(error){
                console.error('Error fetching dashboard stats', error);
            }
        }
        fetchStats()
    },[])

    return (
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="stat-card">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Total Products</h2>
                <p className="mt-3 text-4xl font-black text-slate-900">{stats.products}</p>
                <p className="mt-1 text-xs text-slate-400">All catalogued SKUs</p>
            </div>

            {user?.role.toUpperCase() !== 'WAREHOUSESTAFF' && (
                <>
                    <div className="stat-card">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Total Orders</h2>
                        <p className="mt-3 text-4xl font-black text-slate-900">{stats.orders}</p>
                        <p className="mt-1 text-xs text-slate-400">Across every channel</p>
                    </div>
                    <div className="stat-card">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Total Customers</h2>
                        <p className="mt-3 text-4xl font-black text-slate-900">{stats.customers}</p>
                        <p className="mt-1 text-xs text-slate-400">Active buyers in CRM</p>
                    </div>
                </>
                 )}
        </div>
    )
}
export default DashBoard;

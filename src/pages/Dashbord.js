
import { useState,useEffect } from "react";
import { api } from "../services/api";

const DashBoard=()=>{
    const [stats,setStats]=useState({
         products: 0,
         orders: 0,
         customers: 0,
    })
    useEffect(()=>{
        const fetchStats=async()=>{
            try{
                const productsResponse=await api.get("/products")
                const ordersResponse=await api.get("/orders")
                const customersResponse=await api.get("/customers")

                const totalProducts=productsResponse.data.length
                const totalOrders=ordersResponse.data.length;
                const totalCustomers=customersResponse.data.length;
                setStats({
                    products: totalProducts,
                    orders: totalOrders,
                    customers: totalCustomers
                });
            }
            catch(error){
                console.error('Error fetching dashboard stats', error);
            }
        }
        fetchStats()
    },[])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Total Products</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.products}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.orders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700">Total Customers</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.customers}</p>
        </div>
      </div>
        </>
    )
}
export default DashBoard;
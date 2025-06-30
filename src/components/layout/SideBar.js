import {HomeIcon,CubeIcon,UsersIcon,ShoppingCartIcon,ArchiveBoxIcon } from "@heroicons/react/16/solid";
import { NavLink } from "react-router"; 

const navigation=[
    {name:'DashBoard',to:'/',icon:HomeIcon},
    {name:'Products',to:'/products',icon:CubeIcon},
    {name:'Inventory',to:'/inventory',icon:ArchiveBoxIcon},
    {name:'Orders',to:'/orders',icon:ShoppingCartIcon},
    {name:'Customers',to:'/customers',icon:UsersIcon}
]

const SideBar=()=>{
    return(
        <>
             <div className="w-64 bg-indigo-300 text-amber-100 flex flex-col">
                 <div className="h-16 flex justify-center items-center text-2xl font-bold" >
                  IMS
                </div>
                <nav className="flex-1 px-2 py-4 space-y-2">
                    {navigation.map((item=>(
                        <NavLink key={item.name}to={item.to} className={({isActive})=>
                            `flex items-center px-4 py-2 rounded-md text-sm font-medium ${isActive?'bg-gray-800 text-white':'text-gray-300 hover:bg-gray-700 hover:text-white'}`
                    }>
                            <item.icon className="h-5 w-5 mr-3"/>
                            {item.name}
                        </NavLink>
                    )))}
                </nav> 
            </div> 
        </>
    )
}
export default SideBar

import { useState,useEffect } from "react";
import { useNavigate } from "react-router";
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

        const handleitem=()=>{
            if(!selectedProductId || quantity<=0){
                toast.warn('Please select a product and enter a valid quantity.')
                return;
            }
        }

        try{
            const productToAdd=products.find(product=>product.id=parseInt(selectProductId))
            const inventoryResponse=await api.get(`/inventory/product/${productToAdd.id}`)
            const availablequantity=inventoryResponse.data.quantityAvailable

            if(availablequantity<quantity){
                toast.error(`Not enough stock for product:${productToAdd.name}`)
                return
            }

            const existingItemIndex=orderItems.findIndex(item=>item.product.id===productToAdd.id)
            if(existingItemIndex){
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

        const handleRemoveItem=(productId)=>{
            setOrderItems(orderItems.filter(item=>item.product.id!==productId))
        }

        const handleSubmitOrder=async()=>{
            
        }
}
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { api } from "../services/api";
import { toast } from "react-toastify";

const ProductForm=()=>{
    const [product, setProduct] = useState({ name:'',description:'',price:'',sku:'' })
    const navigate=useNavigate()
    const {id}=useParams()
    const isEditing=Boolean(id)

   
    useEffect(()=>{
            if(isEditing){
            const fetchProduct=async()=>{
                try{
                    const response=await api.get(`/products/${id}`)
                    setProduct(response.data);
                }
                catch (error) {
                    toast.error('Failed to fetch product details.');
                    navigate('/products');
                }
            }
            fetchProduct()
        }   
    },[id,isEditing,navigate])

    const handleChange=(event)=>{
        setProduct({...product,[event.target.name]:event.target.value})
    }

    const handleSubmit=async(event)=>{
        event.preventDefault()
        try{
            if(isEditing){
                await api.put(`/products/${id}`,product)
            }
            else{
                 await api.post('/products',product)
                 toast.success('Product created successfully!')
            }
            navigate("/products")
        }
        catch(error){
            toast.error(`Failed to ${isEditing?'update':'create'} product.`)
        }
    }

    return(
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditing?'Edit Product':'Add New Product'}</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                 <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input type="text" name="name" id="name" value={product.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                            <input type="text" name="sku" id="sku" value={product.sku} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                        </div>

                         <div className="col-span-1">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input type="number" step="0.01" name="price" id="price" value={product.price} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="description" id="description" rows="4" value={product.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                        </div>
                    </div>

                     <div className="mt-6 flex justify-end">
                        <button type="button" onClick={() => navigate('/products')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 mr-3">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">{isEditing ? 'Update Product' : 'Save Product'}</button>
                     </div>
                 </form>
            </div>
        </div>
    )
}

export default ProductForm
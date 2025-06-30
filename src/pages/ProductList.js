import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router";
import { toast } from "react-toastify";
import {PlusIcon, PencilIcon, TrashIcon} from "@heroicons/react/16/solid"


const ProductList=()=>{
    const [products,setProducts]=useState([])
   /*  const [form,setForm]=useState({name:'',description:'',price:'',sku:''})
    const [editingId, setEditingId] = useState(null); */

    useEffect(()=>{
        fetchProducts()
    },[])
    
    const fetchProducts = async () => {
        try{
            const res = await api.get('/products');
            setProducts(res.data);
        }
        catch(error){
            toast.error('Failed to fetch products')
        }
    }

    /* const handleChange=(event)=>{
        setForm({...form,[event.target.name]:event.target.value})
    } */
   /*  const handleSubmit=async(event)=>{
        event.preventDefault()
        await api.post('/products',{...form,price:parseFloat(form.price)})
        setForm({ name: '', description: '', price: '', sku: '' });
        fetchProducts();
    } */

    const handleDelete=async(productId)=>{
        try{
            await api.delete(`/products/${productId}`);
            console.log("rahul")
            toast.success('Product deleted successfully')
            fetchProducts();
        }
        catch(error){
              toast.error('Failed to delete product')
        }
    }

    return(
       <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-800">Products</h1>
                <Link to='/products/new' className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center">
                     <PlusIcon className="h-5 w-5 mr-2" />
                        Add Product
                </Link>
            </div>
             <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                     <thead className="bg-gray-50">
                         <tr>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                         </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product)=>(
                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end space-x-4">
                                        <Link to={`/products/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            <PencilIcon className="h-5 w-5 inline" />
                                        </Link>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                                                <TrashIcon className="h-5 w-5 inline" />
                                        </button>
                                    </div>
                                 </td>
                            </tr>
                        ))}
                     </tbody>
                </table>
             </div>
       </div>
    )
}
export default ProductList;
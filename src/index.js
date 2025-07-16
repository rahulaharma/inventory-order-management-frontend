import App from "./App"
import ReactDOM from "react-dom/client"
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import DashBoard from "./pages/Dashbord";
import ProductForm from "./pages/ProductForm";
import ProductList from "./pages/ProductList";
import InventoryList from "./pages/InventoryList";
import CustomerList from "./pages/CustomerList";
import CustomerForm from "./pages/CustomerForm";
import OrderList from "./pages/OrderList";
import Createorder from "./pages/Createorder";
import OrderDetail from "./pages/OrderDetail";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./pages/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import RoleBasedRoute from "./pages/RoleBasedRoute";

const router = createBrowserRouter([

  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
     children: [
      {index: true, element:<DashBoard/>},
      {path:'products', element:<ProductList/>},
      {path:'products/new', element:<ProductForm/>},
      {path:'products/edit/:id', element:<ProductForm/>},
      {path:'inventory', element:<InventoryList/>},
      {path:'customers', element:<CustomerList/>},
      {path:'customers/new', element:<CustomerForm/>},
      {path:'customers/edit/:id', element:<CustomerForm/>},
      
      {
        path: 'orders',
        element: <RoleBasedRoute allowedRoles={['SALES_STAFF']} />,
        children: [
          {index: true, element:<OrderList/>},
          {path:'new', element:<Createorder/>},
          {path:':id', element:<OrderDetail/>},
        ],
      },
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false}  theme="light" />
    </AuthProvider>
  </React.StrictMode>
);

import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
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
import Login from "./pages/Login";
import Register from "./pages/Register";

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
    // This is the parent route for all protected pages
    path: "/",
    element: (
      <ProtectedRoute>
        <App /> 
      </ProtectedRoute>
    ),
    // The components below will be rendered inside App's <Outlet />
    children: [
      {
        index: true, // The default child route
        element: <DashBoard />,
      },
      {
        path: 'products',
        element: <RoleBasedRoute allowedRoles={['SALESSTAFF', 'ADMIN']} />,
        children: [
          { index: true, element: <ProductList /> },
          { path: 'new', element: <ProductForm /> },
          { path: 'edit/:id', element: <ProductForm /> },
        ],
      },
      {
        path: 'inventory',
        element: <RoleBasedRoute allowedRoles={['WAREHOUSESTAFF', 'ADMIN']} />,
        children: [
          { index: true, element: <InventoryList /> },
        ],
      },
      {
        path: 'customers',
        element: <RoleBasedRoute allowedRoles={['SALESSTAFF', 'ADMIN']} />,
        children: [
          { index: true, element: <CustomerList /> },
          { path: 'new', element: <CustomerForm /> },
          { path: 'edit/:id', element: <CustomerForm /> },
        ],
      },
      {
        path: 'orders',
        element: <RoleBasedRoute allowedRoles={['SALESSTAFF', 'ADMIN']} />,
        children: [
          { index: true, element: <OrderList /> },
          { path: 'new', element: <Createorder /> },
          { path: ':id', element: <OrderDetail /> },
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
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} theme="light" />
    </AuthProvider>
  </React.StrictMode>
);
import App from "./App"
import ReactDOM from "react-dom/client"
import {createBrowserRouter,RouterProvider} from "react-router";
import DashBoard from "./pages/Dashbord";
import ProductForm from "./pages/ProductForm";
import ProductList from "./pages/ProductList";
import InventoryList from "./pages/InventoryList";
import CustomerList from "./pages/CustomerList";
import CustomerForm from "./pages/CustomerForm";


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
     children: [
      { index: true, Component: DashBoard },
      {path:"products",Component:ProductList},
      {path:"products/new",Component:ProductForm},
      {path:"/products/edit/:id",Component:ProductForm},
      {path:"inventory",Component:InventoryList},
      {path:"/customers", Component:CustomerList},
      {path:"/customers/new",Component:CustomerForm},
      {path:"/customers/edit/:id",Component:CustomerForm}
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);

# Inventory & Order Management System - Frontend

This is the frontend for a comprehensive Inventory and Order Management System, built with a modern, high-performance tech stack including React 19, React Router v7, and Tailwind CSS v4.

The application provides a user-friendly interface for managing products, inventory levels, customers, and sales orders. It features role-based access control to ensure that staff members can only access the features relevant to their roles.
---

## ✨ Key Features

* **Dashboard:** An overview of key metrics and system activity.
* **Product Management:** Full CRUD (Create, Read, Update, Delete) functionality for products.
* **Inventory Tracking:** Monitor stock levels and manage inventory updates.
* **Customer Management:** Maintain a database of customers with complete CRUD operations.
* **Order Processing:**
    * Create new sales orders.
    * View a list of all orders.
    * Drill down into detailed order information.
* **User Authentication:** Secure login and registration system using JWT.
* **Role-Based Access Control:** Custom routes and components (`ProtectedRoute`, `RoleBasedRoute`) restrict access based on user roles (e.g., Sales Staff).
* **Interactive Notifications:** User-friendly feedback through toast notifications.
  
---
## 🚀 Technologies Used

* **Framework:** **React 19**
* **Bundler:** **Parcel v2**
* **Routing:** **React Router DOM v7**
* **Styling:** **Tailwind CSS v4** & Heroicons
* **HTTP Client:** Axios
* **State Management:** React Context API (`AuthProvider`)
* **Notifications:** React Toastify
* **Authentication:** JWT Decode

---

## 🛠️ Installation & Setup

Follow these steps to get the development environment running locally.

### Prerequisites

* [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
* [npm](https://www.npmjs.com/) (comes with Node.js)
  
### 1. Clone the Repository

```sh
git clone [https://github.com/rahulaharma/inventory-order-management-frontend.git](https://github.com/rahulaharma/inventory-order-management-frontend.git)
cd inventory-order-management-frontend
```
### 2. Install Dependencies

Install all the required npm packages.

```sh
npm install
```
### 3. Set Up Environment Variables

This project requires an API endpoint to connect to the backend.

1.  Create a new file in the root of the project named `.env`.
2.  Add the following variable, pointing to your backend server URL:

    ```env
    REACT_APP_API_BASE_URL=http://localhost:8080/api
    ```

    *(Adjust the URL if your backend server runs on a different port or domain.)*

### 4. Run the Development Server

Start the Parcel development server.

```sh
npm run start
```

The application should now be running on `http://localhost:1234`.

---

## 📜 Available Scripts

In the project directory, you can run:

* `npm run start`
    * Runs the app in development mode with hot-reloading.
* `npm run build`
    * Builds the app for production to the `dist` folder. It correctly bundles React and optimizes the build for the best performance.


---

## ✍️ Author

Created by **Rahul Sharma**.

---

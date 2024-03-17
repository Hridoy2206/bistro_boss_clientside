import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Secret from "../shared/Secret";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";
import AdItem from "../pages/Dashboard/Admin/AdItem";
import ManageItem from "../pages/Dashboard/Admin/ManageItem";
import EditItem from "../pages/Dashboard/Admin/EditItem";
import Payment from "../pages/Dashboard/PaymentMethod/Payment";
import PaymentHistory from "../pages/Dashboard/UserDashboard/PaymentHistory";
import MyCart from "../pages/Dashboard/UserDashboard/MyCart";
import UserDashboardHome from "../pages/Dashboard/UserDashboard/UserDashboardHome";
import AdminHome from "../pages/Dashboard/Admin/AdminHome/AdminHome";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/our-menu",
                element: <Menu />
            },
            {
                path: "order/:category",
                element: <Order />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "secret",
                element: <PrivateRoute><Secret /></PrivateRoute>
            },

        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute> <Dashboard /></PrivateRoute>,
        children: [
            //* ====== user route =====*\\
            {
                path: "home",
                element: <UserDashboardHome />
            },
            {
                path: "my-cart",
                element: <MyCart />
            },
            {
                path: "payment",
                element: <Payment />
            },
            {
                path: "payment-history",
                element: <PaymentHistory />
            },

            //* ====== Admin route =====*\\
            {
                path: "admin/all-user",
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: "admin/home",
                element: <AdminRoute><AdminHome /></AdminRoute>
            },
            {
                path: "admin/ad-item",
                element: <AdminRoute><AdItem /></AdminRoute>
            },
            {
                path: "admin/manage-item",
                element: <AdminRoute><ManageItem /></AdminRoute>
            },
            {
                path: "admin/edit-item/:id",
                element: <AdminRoute><EditItem /></AdminRoute>
            },
        ]
    }
])
import { createBrowserRouter } from "react-router-dom"
import Appointment from "../Pages/Appointment/Appointment/Appointment";
import AddADoctor from "../Pages/Dashboard/AddADoctor/AddADoctor";
import ManageDoctors from "../Pages/Dashboard/ManageDoctors/ManageDoctors";

import MyAppointment from "../Pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Users from "../Pages/Dashboard/Users/Users";

import Home from "../Pages/Home/Home/Home";
import DashboardLayout from "../Pages/Layouts/DashboardLayout";
import Root from "../Pages/Layouts/Root"
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import ErrorElement from "../Pages/Shared/ErrorElement/ErrorElement";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorElement />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/appointment",
                element: <Appointment />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    },
    {

        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <ErrorElement />,
        children: [
            {
                path: "/dashboard",
                element: <MyAppointment />
            },
            {
                path: "/dashboard/users",
                element: <AdminRoute><Users /></AdminRoute>
            },
            {
                path: "/dashboard/adddoctor",
                element: <AdminRoute><AddADoctor /></AdminRoute>
            },
            {
                path: "/dashboard/managedoctors",
                element: <AdminRoute><ManageDoctors /></AdminRoute>
            },
            {
                path: "/dashboard/payment/:id",
                element: <Payment />,
                loader: ({ params }) => fetch(`https://doctors-portal-server-woad.vercel.app/bookings/${params.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
            }

        ]

    }
])

export default router;
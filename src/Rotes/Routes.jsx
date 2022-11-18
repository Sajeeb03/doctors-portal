import { createBrowserRouter } from "react-router-dom"
import Appointment from "../Pages/Appointment/Appointment/Appointment";

import Home from "../Pages/Home/Home/Home";
import Root from "../Pages/Layouts/Root"
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
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
    }
])

export default router;
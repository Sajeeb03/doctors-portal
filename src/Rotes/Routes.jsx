import { createBrowserRouter } from "react-router-dom"
import Appointment from "../Pages/Appointment/Appointment/Appointment";

import Home from "../Pages/Home/Home/Home";
import Root from "../Pages/Layouts/Root"

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
            }
        ]
    }
])

export default router;
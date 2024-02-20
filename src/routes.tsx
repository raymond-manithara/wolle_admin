import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Auth from "./Screens/Auth";
import OTP from "./Screens/OTP";
import Home from "./Screens/home";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AddProducts from "./Screens/AddProduct";

const WolleRoutes = ()=>{

    const wolleRoutes = createBrowserRouter([
        {
            
            element: <PrivateRoute/>,
            children:[
                {
                    path: "/products",
                    element: <Home/>
                },
                {
                    path: "/add-product",
                    element: <AddProducts/>
                }
            ]
        },
        {
            path: "/",
            element: <Auth/>
        },
        {
            path:"/otp",
            element: <OTP/>
        }
    ]);
    return <RouterProvider router={wolleRoutes}/>
}
export default WolleRoutes;
import {createBrowserRouter } from "react-router-dom"
import {ROUTES} from "../constants/routePath"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import MainLayout from "../layouts/MainPage/MainLayout"
import Layout from "../layouts/LoginRegister/Layout"
import LoginComponent from "../components/LoginComponent/LoginComponent"
import RegisterComponent from "../components/RegisterComponent/RegisterComponent"

export const routes = createBrowserRouter([
    
    {
            path:ROUTES.BASEURL,
            element:<MainLayout></MainLayout>,
            children:[{
                
            }]


    },

    {
        path:ROUTES.LOGIN,
        // element:<Login></Login>
        element:<Layout><LoginComponent></LoginComponent></Layout>
    },{
        path:ROUTES.REGISTER,
        // element:<Register></Register>
        element:<Layout><RegisterComponent></RegisterComponent></Layout>
    }

])
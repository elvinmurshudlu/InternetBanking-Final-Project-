import {createBrowserRouter } from "react-router-dom"
import {ROUTES} from "../constants/routePath"
import MainLayout from "../layouts/MainPage/MainLayout"
import Layout from "../layouts/LoginRegister/Layout"
import LoginComponent from "../components/LoginComponent/LoginComponent"
import RegisterComponent from "../components/RegisterComponent/RegisterComponent"
import DashboardIcon from "@mui/icons-material/Dashboard";
import Cards from "../pages/Cards/Cards"
import Transactions from "../pages/Transactions/Transactions"



export const routes = createBrowserRouter([    
    {
            path:ROUTES.BASEURL,
            element:<MainLayout></MainLayout>,
            children:[{
                path:ROUTES.BASEURL,
                element:<div>Dashboard

                    <DashboardIcon color="primary"/>
                </div>
                
            }
            ,
            {
                path:ROUTES.CARDS,
                element:<Cards></Cards>
                
            }
            ,
            {
                path:ROUTES.TRANSACTIONS,
                element:<Transactions></Transactions>
                
            }
            ,
            {
                path:ROUTES.INVOICES,
                element:<div>Invoices</div>
                
            }
            ,
            {
                path:ROUTES.STATISTICS,
                element:<div>Statistics</div>
                
            },
            {
                path:ROUTES.INVOICES,
                element:<div>Invoices</div>
                
            }
            ,
            {
                path:ROUTES.MYWALLET,
                element:<div>mywallet</div>
                
            }
        ]
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
import {createBrowserRouter } from "react-router-dom"
import {ROUTES} from "../constants/routePath"
import MainLayout from "../layouts/MainPage/MainLayout"
import Layout from "../layouts/LoginRegister/Layout"
import LoginComponent from "../components/LoginComponent/LoginComponent"
import RegisterComponent from "../components/RegisterComponent/RegisterComponent"
import DashboardIcon from "@mui/icons-material/Dashboard";
import Cards from "../pages/Cards/Cards"
import Transactions from "../pages/Transactions/Transactions"
import Accounts from "../pages/Accounts/Accounts"
import Dashboard from "../pages/Dashboard/Dashboard"
import SettingsPage from "../pages/Settings/SettingsPage"



export const routes = createBrowserRouter([    
    {
            path:ROUTES.BASEURL,
            element:<MainLayout></MainLayout>,
            children:[{
                path:ROUTES.BASEURL,
                element:<Dashboard></Dashboard>
                
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
                path:ROUTES.ACCOUNT,
                element:<Accounts></Accounts>
                
            }
            ,
            {
                path:ROUTES.INVESMENTS,
                element:<div>Invesments</div>
                
            }
            ,
            {
                path:ROUTES.LOANS,
                element:<div>Loans</div>
                
            }
            ,
            {
                path:ROUTES.SERVICES,
                element:<div>Services</div>
                
            }
            ,
            {
                path:ROUTES.PRIVILAGES,
                element:<div>My Privilages</div>
                
            }
            ,
            {
                path:ROUTES.SETTINGS,
                element:<SettingsPage></SettingsPage>
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
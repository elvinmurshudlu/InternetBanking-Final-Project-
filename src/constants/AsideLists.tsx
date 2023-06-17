import { ROUTES } from "./routePath";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaidIcon from "@mui/icons-material/Paid";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FileCopyIcon from "@mui/icons-material/FileCopy";


export const  lists = [
    {
      title: "Dashboard",
      url: ROUTES.BASEURL,
      icon: <img src="/icons/dashboard.svg"></img>,
    },
    {
      title: "Transactions",
      url: ROUTES.TRANSACTIONS,
      icon:<img src="/icons/transactions.svg"></img>
    },
    {
      title: "Accounts",
      url: ROUTES.ACCOUNT,
      icon: <img src="/icons/accounts.svg"></img>,
    },
    // {
    //   title: "Invesments",
    //   url: ROUTES.INVESMENTS,
    //   icon: <img src="/icons/invesment.svg"></img>,
    // },
    {
      title: "Credit Cards",
      url: ROUTES.CARDS,
      icon: <img src="/icons/creditcard.svg"></img> ,
    },
    {
        title: "Settings",
        url: ROUTES.SETTINGS, 
        icon: <img src="/icons/loan 1.svg"></img>,
      }
    // {
    //   title: "Loans",
    //   url: ROUTES.LOANS, 
    //   icon: <img src="/icons/loan 1.svg"></img>,
    // }
    // ,{
    //   title: "Services",
    //   url: ROUTES.SERVICES,
    //   icon: <img src="/icons/service 1.svg"></img>,
    // },{
    //   title: "My Privilages",
    //   url: ROUTES.PRIVILAGES,
    //   icon: <img src="/icons/privileges.svg"></img>,
    // },
  ];
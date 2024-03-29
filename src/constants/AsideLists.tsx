import { ROUTES } from "./routePath";
import SettingsIcon from '@mui/icons-material/Settings';

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
        icon: <SettingsIcon></SettingsIcon>,
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
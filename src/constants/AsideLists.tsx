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
      icon: <DashboardIcon />,
    },
    {
      title: "Cards",
      url: ROUTES.CARDS,
      icon: <CreditCardIcon />,
    },
    {
      title: "Transactions",
      url: ROUTES.TRANSACTIONS,
      icon: <PaidIcon/>
    },
    {
      title: "Statistics",
      url: ROUTES.STATISTICS,
      icon: <BarChartIcon />,
    },
    {
      title: "MyWallet",
      url: ROUTES.MYWALLET,
      icon: <AccountBalanceWalletIcon /> ,
    },
    {
      title: "Invoices",
      url: ROUTES.INVOICES,
      icon: <FileCopyIcon />,
    },
  ];
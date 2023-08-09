import { Message, Notifications, Person } from "@mui/icons-material"
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material"
import { useLocation } from "react-router-dom"
import SearchIcon from "@mui/icons-material/Search"
import {useState, useEffect, useContext} from "react"

import { lists } from "../../constants/AsideLists"
import { HeaderCurrentPage } from "../../Models/Header"
import { theme } from "../../assets/Themes/Theme"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { ITransactions } from "../../Models/Transactions"
import NotificationBox from "../NotificationBox/NotificationBox"
import {LanguageApi} from "../../contextApi/LanguageContext";
import {dictionary} from "../../Language/lang";
import MobileNavbar from "../MobileNavbar/MobileNavbar"
import { palette,ThemeApi } from "../../contextApi/ThemeContext"

import { FiMenu } from 'react-icons/fi';

export default function Header() {

  const mode = useContext(ThemeApi)

    const lang = useContext(LanguageApi)

  const [currentPage, setCurrentPage] = useState<HeaderCurrentPage>({
    title: "",
    icon: "",
  })

  const transactions = useSelector(
    (state: RootState) => state.userTransactions.transactions
  )

  function notificationsFilter(tractions: ITransactions[]) {
    let result = 0
    transactions.map((transaction) => {
      if (transaction.notification) result++
    })
    return result
  }

  let location = useLocation()

  useEffect(() => {
    lists.map((list) => {
      if (list.url === location.pathname) {
        setCurrentPage({ title: list.title, icon: list.icon })
      }
    })
  }, [location])

  useEffect(()=>{
    setMobileNavbar(false)
  },[location.pathname])

  const [notificationBox, setNotificationBox] = useState<boolean>(false)

  const [openMobileNavbar,setMobileNavbar] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position:'relative'
        }}
      >
        <Typography
          sx={{
            display: "flex",
            fontSize: "35px",
            alignItems: "center",
            gap: "5px",
            color: "#343C6A",
          }}
        >
          <Avatar
            variant="square"
            sx={{ borderRadius: "10px", bgcolor: "#FFF" }}
          >
            {currentPage.icon}
          </Avatar>
            {currentPage.title && dictionary[currentPage.title][lang.language]}
            {/*{currentPage.title}*/}
        </Typography>

        <Box  sx={{  position:'absolute',left:'0',top:'130%',zIndex:'4',width:'100%', height:openMobileNavbar ? 'max-content' : '0',overflow:'hidden',backgroundColor:palette.componentsBackground[mode.mode],padding:openMobileNavbar ? '20px 0 30px 0' :'0'}}>
          <MobileNavbar></MobileNavbar>
        </Box>

        <Box onClick={()=>setMobileNavbar(!openMobileNavbar)} sx={{display:{xs:'block',md:'none'}}}>
        <Avatar
            variant="square"
            sx={{ borderRadius: "10px", bgcolor: "#FFF" }}
          >
            <IconButton><FiMenu></FiMenu></IconButton>
          </Avatar>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

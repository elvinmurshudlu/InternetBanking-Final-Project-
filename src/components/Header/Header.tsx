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
import { useState, useEffect } from "react"

import { lists } from "../../constants/AsideLists"
import { HeaderCurrentPage } from "../../Models/Header"
import { theme } from "../../assets/Themes/Theme"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { ITransactions } from "../../Models/Transactions"
import NotificationBox from "../NotificationBox/NotificationBox"

export default function Header() {
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

  const [notificationBox, setNotificationBox] = useState<boolean>(false)

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor:"#FFF"
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
          {currentPage.title}
        </Typography>

        <TextField
          sx={{ display: { xs: "none", sm: "flex" } }}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "white" }}></SearchIcon>
              </InputAdornment>
            ),
          }}
          placeholder="Search here ..."
        ></TextField>

        <List
          sx={{
            display: { xs: "none", md: "flex" },
            fontSize: "30px",
            position: "relative",
          }}
        >
          <ListItem>
            <IconButton onClick={(e: any) => setNotificationBox(!notificationBox)}>
              <Badge
                badgeContent={notificationsFilter(transactions)}
                color="secondary"
                max={10}
              >
                <Notifications
                  sx={{
                    color: "white",
                  }}
                  fontSize="medium"
                ></Notifications>
              </Badge>
            </IconButton>
            <NotificationBox open={notificationBox}></NotificationBox>
          </ListItem>

          <ListItem>
            <IconButton>
              <Badge badgeContent="20" color="secondary" max={10}>
                <Message
                  sx={{
                    color: "white",
                  }}
                  fontSize="medium"
                ></Message>
              </Badge>
            </IconButton>
          </ListItem>

          <ListItem>
            <IconButton>
              <Badge color="secondary" max={10}>
                <Person
                  sx={{
                    color: "white",
                  }}
                  fontSize="medium"
                ></Person>
              </Badge>
            </IconButton>
          </ListItem>
        </List>
      </Box>
    </ThemeProvider>
  )
}

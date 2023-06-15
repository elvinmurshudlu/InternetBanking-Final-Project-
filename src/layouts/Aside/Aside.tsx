import {useState} from 'react'

import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { lists} from "../../constants/AsideLists"

import { Link,  useLocation } from "react-router-dom";
import {  style } from "./Aside.style";
import { deepPurple } from "@mui/material/colors";




export default function Aside() {
  let location = useLocation();





  return (


  
 <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        // background: `linear-gradient(#763ED0, #4A28B2)`,
        backgroundColor: `#FFF`,
        // borderTopRightRadius:"20px",
        // borderBottomRightRadius:"20px",
        borderRight:"2px solid #E6EFF5",
        flexDirection:"column",
        padding:"35px 0px",
        rowGap:"20px"
      }}

    >

        <Typography sx={{display:"flex",alignItems:"center",fontSize:"30px",color:"#343C6A",columnGap:"20px"}}>
            <Avatar variant="square" sx={{borderRadius:"10px",bgcolor:deepPurple["700"]}}>
              <AccountBalanceIcon></AccountBalanceIcon>
            </Avatar>

            Banking

        </Typography>




      <List sx={{ width: "100%" }}>
        {lists.map((list, index) => (
          <ListItem key={index} sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemButton
              sx={style}
              selected={location.pathname === list.url}
              component={Link}
              to={list.url}
              
            >
              <ListItemIcon >{list.icon}</ListItemIcon>
              <ListItemText primary={list.title}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}




      </List>


    </Box>

 
); 
  
}


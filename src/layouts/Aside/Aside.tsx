import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {dictionary} from "../../Language/lang";
import { lists} from "../../constants/AsideLists"

import { Link,  useLocation } from "react-router-dom";
import {  style } from "./Aside.style";
import { deepPurple } from "@mui/material/colors";
import {useContext, useEffect} from "react";
import  {LanguageApi} from "../../contextApi/LanguageContext";




export default function Aside() {
  let location = useLocation();

  const lang = useContext(LanguageApi)

    console.log(lang.language)





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
            <Avatar variant="square" sx={{borderRadius:"10px",backgroundColor:"#FFF"}}>
              <img src="./icons/Logo.svg" alt="" />
            </Avatar>

            softbank

        </Typography>




      <List sx={{ width: "100%",padding:"0 10px" }}>
        {lists.map((list, index) => (
          <ListItem key={index} sx={{ paddingTop: 0, paddingBottom: 0 }}>
            <ListItemButton
              sx={style}
              selected={location.pathname === list.url}
              component={Link}
              to={list.url}
              
            >
              <ListItemIcon >{list.icon}</ListItemIcon>
              <ListItemText primary={dictionary[list.title][lang.language]}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}




      </List>


    </Box>

 
); 
  
}


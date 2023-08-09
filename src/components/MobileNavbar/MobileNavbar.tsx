import React from 'react'
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

  import {palette, ThemeApi} from "../../contextApi/ThemeContext";

import {dictionary} from "../../Language/lang";
import { lists} from "../../constants/AsideLists"

import { Link,  useLocation } from "react-router-dom";
import {  style } from "../../layouts/Aside/Aside.style";
import { deepPurple } from "@mui/material/colors";
import {useContext, useEffect} from "react";
import  {LanguageApi} from "../../contextApi/LanguageContext";


export default function MobileNavbar() {

    const mode = useContext(ThemeApi)

  let location = useLocation();

  const lang = useContext(LanguageApi)

 

  return (
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
  )
}

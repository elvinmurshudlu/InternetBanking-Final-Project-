import {useState} from 'react'

import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import { lists} from "../../constants/AsideLists"

import { Link,  useLocation } from "react-router-dom";
import {  style } from "./Aside.style";
import { blue, indigo, red } from "@mui/material/colors";




export default function Aside() {
  let location = useLocation();


  const theme = createTheme({
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'dashed' },
            style: {
              textTransform: 'none',
              border: `2px dashed ${blue[500]}`,
              color:blue[600],
              letterSpacing:"20px"

            },
          },
          {
            props: { variant: 'dashed', color: 'secondary' },
            style: {
              border: `4px dashed ${red[500]}`,
            },
          },
        ],
        
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&.Mui-selected":{
              backgroundColor:"white",
              color:indigo["A700"],
              "&:hover":{
                  backgroundColor:"white",
                  fontSize:"100px",
                  color:"green",
                }

          }
          ,
          "&:hover":{
                  backgroundColor:indigo[200],
                  color:"white"
          }
          },
        },
      },
    },
  });



  return (


  
 <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: `linear-gradient(#763ED0, #4A28B2)`,
        borderTopRightRadius:"20px",
        borderBottomRightRadius:"20px",
      }}
    >
      <List sx={{ width: "90%" }}>
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


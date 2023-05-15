import { Dashboard, Message, Notifications, Person } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, TextField, ThemeProvider, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import {useState,useEffect} from "react"

import {lists} from "../../constants/AsideLists" 
import { HeaderCurrentPage } from "../../Models/Header";
import { theme } from "../../assets/Themes/Theme";



export default function Header() {
    const [ currentPage,setCurrentPage] = useState<HeaderCurrentPage>({"title":"","icon":""})

    let location = useLocation()

useEffect(()=>{

    lists.map((list)=>{
        if(list.url === location.pathname){
            setCurrentPage({"title":list.title,"icon":list.icon})
        }
    })

},[location])

  return (

    <ThemeProvider theme={theme}>

        <Box sx={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Typography sx={{display:"flex",fontSize:"35px",alignItems:"center",gap:"5px",color:"white"}}>
                <Avatar variant="square" sx={{borderRadius:"10px",bgcolor:deepPurple["700"]}}>
                {currentPage.icon}
                </Avatar >
                        {currentPage.title}       


            </Typography>

            <TextField size="small" InputProps={{endAdornment:(<InputAdornment position="start"><SearchIcon sx={{color:"white"}}></SearchIcon></InputAdornment>)}}  placeholder="Search here ..."></TextField>
        
            <List sx={{display:"flex",fontSize:"30px"}}>
                <ListItem>
                    <IconButton>
                        <Badge badgeContent="20" color="secondary" max={10}> 
                            <Notifications fontSize="large"></Notifications>
                        </Badge>
                    </IconButton>
                </ListItem>

                <ListItem>
                    <IconButton>
                        <Badge badgeContent="20" color="secondary" max={10}> 
                            <Message fontSize="large"></Message>
                        </Badge>
                    </IconButton>
                </ListItem>
            
            
                <ListItem>
                    <IconButton>
                        <Badge  color="secondary" max={10}> 
                            <Person fontSize="large"></Person>
                        </Badge>
                    </IconButton>
                </ListItem>
            </List>
            

        
        </Box>
    </ThemeProvider>
  )
}

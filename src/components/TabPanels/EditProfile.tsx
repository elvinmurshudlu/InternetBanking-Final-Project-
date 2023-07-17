import {Grid, Button, FormControl, TextField, Avatar, NativeSelect, Typography,} from "@mui/material"
import { DateField, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import {
  useChangeUserDetailsMutation,
  useGetUserDetailsQuery,
} from "../../features/userDetails"
import React, {useContext, useState} from "react"
import { IUserDetails } from "../../Models/UserDetails"
import dayjs from "dayjs"
import axios from "axios"
import { server, serverPort } from "../../services/config"
import {dictionary} from "../../Language/lang";
import Skeleton from '@mui/material/Skeleton';
import {LanguageApi} from "../../contextApi/LanguageContext";

export default function EditProfile() {

  const { data, isLoading, refetch } = useGetUserDetailsQuery("")
  
const language = useContext(LanguageApi)



    function onChangeLanguage(e:any){
        language.change(e.target.value)
        localStorage.setItem("Lang",e.target.value)


    }

  const [userCredentials, setUserCredentials] = useState<IUserDetails>({})

  const [changeUserDetail ] = useChangeUserDetailsMutation()


  const [profPic,setProfPic] = useState<any>()

  function handleProfPic(event: any) {

    const data = event.target.files[0]

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;
      setProfPic(image)
    };

    if (data) {
      reader.readAsDataURL(data);
     }
    
     setUserCredentials((user)=>({...user,["profilePicture"]:data}))
      }


  async function submit(e: any) {
    e.preventDefault()

    if (userCredentials.profilePicture) {
      const formData = new FormData()
      formData.append("file", userCredentials.profilePicture)
      formData.append("fileName", "ProfPic")
      try {
        const res = await axios.post(`${server }/profPic`, formData,{
          headers:{
            Authorization:document.cookie.split("=")[1]
          }
        })
        refetch()
      } catch  {
      }
    }

    const {profilePicture,...rest} = userCredentials
        await changeUserDetail(rest)
        setUserCredentials({})
        refetch()
  }

  function handleChange(key: string, value: string) {
    setUserCredentials((detail) => ({ ...detail, [key]: value }))
  }

  if (isLoading) {
    return <Skeleton variant="circular"/>
  }


  
  return (
    <Grid
      component="form"
      container
      rowSpacing={5}
      sx={{ justifyContent: "space-between", padding: "0 35px 0 0" }}
    >
      <Grid item xs={12} md={2} sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <Avatar
              src={profPic ? profPic : `${server}/api/images/${data?.profilePicture}`}
              sx={{ width: 124, height: 124 }}
            ></Avatar>
            <Button component="label" htmlFor="file">
              {dictionary["Change profile"][language.language]}
            </Button>
            <input
              onChange={handleProfPic}
              id="file"
              type="file"
              style={{ display: "none" }}
            ></input>
      </Grid>
      
      
<Grid item xs={12} md={9} 
        // sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}

>
  <Grid container spacing={3} sx={{display:'flex',justifyContent:"space-between"}}>
  <Grid item xs={12} md={6}>
    <FormControl fullWidth>
            <TextField
              value={data?.name}
              sx={{ borderRadius: "20px" }}
              fullWidth
              size="small"
              label={dictionary["Name"][language.language]}
              disabled
            ></TextField>
          </FormControl>

  </Grid>
  <Grid item xs={12} md={6}>
  
  <FormControl fullWidth>
          <TextField
            sx={{ borderRadius: "20px" }}
            fullWidth
            size="small"
            value={data?.surname}
            label={dictionary["Surname"][language.language]}
            disabled
          ></TextField>
        </FormControl>

  </Grid>

  <Grid item xs={12} md={6}>
  <FormControl fullWidth>
          <TextField
            value={data?.email}
            sx={{ borderRadius: "20px" }}
            fullWidth
            size="small"
            label="Email"
            disabled
          ></TextField>
        </FormControl>

  </Grid>
  

  <Grid item xs={12} md={6}>
  
  <FormControl fullWidth>
          <TextField
            sx={{ borderRadius: "20px" }}
            fullWidth
            size="small"
            value="**********"
            label={dictionary["Password"][language.language]}
            disabled
          ></TextField>
        </FormControl>

  </Grid>

  <Grid item xs={12} md={6}>
  <FormControl fullWidth>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              onChange={(value: any) => handleChange("birth", value)}
              value={
                userCredentials.birth == undefined
                  ? dayjs(data?.birth)
                  : userCredentials.birth
              }
              size="small"
              label={dictionary["Date of Birth"][language.language]}
              format="DD-MM-YYYY"
            />
          </LocalizationProvider>
        </FormControl>

  </Grid>

  <Grid item xs={12} md={6}>
  
  <FormControl fullWidth>
          <TextField
            sx={{ borderRadius: "20px" }}
            onChange={(e: any) =>
              handleChange("permanentAdress", e.target.value)
            }
            value={
              userCredentials.permanentAdress == undefined
                ? data?.permanentAdress
                : userCredentials.permanentAdress
            }
            fullWidth
            size="small"
            label={dictionary["Permanent Address"][language.language]}
          ></TextField>
        </FormControl>

  </Grid>


  <Grid item xs={12} md={6}>
  
  <FormControl fullWidth>
          <TextField
            sx={{ borderRadius: "20px" }}
            onChange={(e: any) => handleChange("postalCode", e.target.value)}
            value={
              userCredentials.postalCode == undefined
                ? data?.postalCode
                : userCredentials.postalCode
            }
            fullWidth
            size="small"
            label={dictionary["Postal Code"][language.language]}
          ></TextField>
        </FormControl>

  </Grid>

  

  <Grid item xs={12} md={6}>
  
  <FormControl fullWidth>
          <TextField
            sx={{ borderRadius: "20px" }}
            fullWidth
            size="small"
            onChange={(e: any) => handleChange("presentAdress", e.target.value)}
            value={
              userCredentials.presentAdress == undefined
                ? data?.presentAdress
                : userCredentials.presentAdress
            }
            label={dictionary["Permanent Address"][language.language]}
          ></TextField>
        </FormControl>

  </Grid>



  <Grid item xs={12} md={6}>
  
  <FormControl fullWidth>
          <TextField
            sx={{ borderRadius: "20px" }}
            fullWidth
            size="small"
            onChange={(e: any) => handleChange("city", e.target.value)}
            value={
              userCredentials.city == undefined
                ? data?.city
                : userCredentials.city
            }
            label={dictionary["City"][language.language]}
          ></TextField>
        </FormControl>

  </Grid>

  <Grid item xs={12} md={6}>
  
  <FormControl fullWidth>
          <TextField
            sx={{ borderRadius: "20px" }}
            fullWidth
            size="small"
            onChange={(e: any) => handleChange("country", e.target.value)}
            value={
              userCredentials.country == undefined
                ? data?.country
                : userCredentials.country
            }
            label={dictionary["Country"][language.language]}
          ></TextField>
        </FormControl>

  </Grid>

  </Grid>

</Grid>

      <Grid item xs={12} sx={{ textAlign: "end" }}>
        <Button
          sx={{
            padding: "10px 60px",
            letterSpacing: "1px",
            borderRadius: "15px",
          }}
          onClick={submit}
          type="submit"
          variant="contained"
          disabled={Object.keys(userCredentials).length === 0}
        >
            {dictionary["Save"][language.language]}
        </Button>
      </Grid>

        <Grid item xs={12} sx={{textAlign:"end",display:"flex",justifyContent:"end",alignItems:"center"}}>
            {/*<Typography variant="subtitle2">Interfeys dili</Typography>*/}
            <NativeSelect
                onChange={onChangeLanguage}
                value={language.language}
            >
                <option value="AZE">AZE</option>
                <option value="EN">EN</option>

            </NativeSelect>
        </Grid>
    </Grid>
  )
}




// const [img, setImg] = useState('');




// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   
//     };
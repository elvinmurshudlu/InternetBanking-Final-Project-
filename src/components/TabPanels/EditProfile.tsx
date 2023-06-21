import { Grid, Button, FormControl, TextField, Avatar } from "@mui/material"
import { DateField, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import {
  useChangeUserDetailsMutation,
  useGetUserDetailsQuery,
} from "../../features/userDetails"
import { useState } from "react"
import { IUserDetails } from "../../Models/UserDetails"
import dayjs from "dayjs"
import axios from "axios"
import { server, serverPort } from "../../services/config"

export default function EditProfile() {

  const { data, isLoading, refetch } = useGetUserDetailsQuery("")


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
        const res = await axios.post(`${server + serverPort}/profPic`, formData,{
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
    return <div>Loading</div>
  }


  return (
    <Grid
      component="form"
      container
      rowSpacing={5}
      sx={{ justifyContent: "space-between", padding: "0 35px 0 0" }}
    >
      <Grid item xs={12} md={2}>
        <Avatar
          src={profPic ? profPic : `${server+serverPort}/api/images/${data?.profilePicture}`}
          sx={{ width: 124, height: 124 }}
        ></Avatar>
        {/* <label htmlFor="file">Change Profile</label> */}
        <Button component="label" htmlFor="file">
          Change profile
        </Button>
        <input
          onChange={handleProfPic}
          id="file"
          type="file"
          style={{ display: "none" }}
        ></input>
        {/* <Button onClick={sendPicture}>Send Picture</Button> */}
      </Grid>
      <Grid
        item
        xs={12}
        md={4.5}
        sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
      >
        <FormControl fullWidth>
          <TextField
            value={data?.name}
            sx={{ borderRadius: "20px" }}
            fullWidth
            size="small"
            label="Name"
            disabled
          ></TextField>
        </FormControl>
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
              label="Date of Birth"
              format="DD-MM-YYYY"
            />
          </LocalizationProvider>
        </FormControl>

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
            label="Permanent Address"
          ></TextField>
        </FormControl>

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
            label="Postal Code"
          ></TextField>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={4.5}
        rowSpacing={3}
        sx={{ display: "flex", flexDirection: "column", rowGap: "30px" }}
      >
        <FormControl fullWidth>
          <TextField
            sx={{ borderRadius: "20px" }}
            fullWidth
            size="small"
            value={data?.surname}
            label="Surname"
            disabled
          ></TextField>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            sx={{ borderRadius: "20px" }}
            fullWidth
            size="small"
            value="**********"
            label="Password"
            disabled
          ></TextField>
        </FormControl>

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
            label="Pressent Address"
          ></TextField>
        </FormControl>

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
            label="City"
          ></TextField>
        </FormControl>

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
            label="Country"
          ></TextField>
        </FormControl>
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
          Save
        </Button>
      </Grid>
    </Grid>
  )
}




// const [img, setImg] = useState('');




// const handleImageChange = (e) => {
//   const file = e.target.files[0];
//   
//     };
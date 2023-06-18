import { Grid,Button,FormControl,TextField } from "@mui/material"
import { DateField, DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export default function EditProfile() {

    function submit(e:any){
        e.preventDefault()
    }

  return (
    <Grid component="form" container rowSpacing={5} sx={{justifyContent:"space-between",padding:"0 35px 0 0"}}>
      <Grid item xs={12} md={2}>
        
      </Grid>
      <Grid item xs={12} md={4.5} sx={{display:"flex",flexDirection:"column",rowGap:"30px"}}>

            <FormControl fullWidth>
                <TextField sx={{borderRadius:"20px"}} fullWidth size="small" label="Your Name" disabled></TextField>
            </FormControl>
            <FormControl fullWidth>
                <TextField sx={{borderRadius:"20px"}} fullWidth size="small" label="Email" disabled></TextField>
            </FormControl>

            <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField size="small" label="Date of Birth" />
                  </LocalizationProvider>
            </FormControl>

            <FormControl fullWidth>
                <TextField sx={{borderRadius:"20px"}} fullWidth size="small" label="Permanent Address" ></TextField>
            </FormControl>

            <FormControl fullWidth>
                <TextField sx={{borderRadius:"20px"}} fullWidth size="small" label="Postal Code" ></TextField>
            </FormControl>

      </Grid>
      <Grid item xs={12} md={4.5} rowSpacing={3} sx={{display:"flex",flexDirection:"column",rowGap:"30px"}}>
      <FormControl fullWidth>
                <TextField sx={{borderRadius:"20px"}} fullWidth size="small" label="User Name" disabled></TextField>
            </FormControl>
            <FormControl fullWidth>
                <TextField sx={{borderRadius:"20px"}} fullWidth size="small" label="Password" disabled></TextField>
            </FormControl>

            <FormControl fullWidth>
                <TextField sx={{borderRadius:"20px"}} fullWidth size="small" label="Pressent Address" ></TextField>
            </FormControl>

            <FormControl fullWidth>
                <TextField sx={{borderRadius:"20px"}} fullWidth size="small" label="City" ></TextField>
            </FormControl>

            <FormControl fullWidth>
                <TextField sx={{borderRadius:"20px"}} fullWidth size="small" label="Country" ></TextField>
            </FormControl>
      </Grid>
      <Grid item xs={12}  sx={{textAlign:"end"}}>
        <Button sx={{padding:"10px 60px",letterSpacing:"1px",borderRadius:"15px"}} onClick={submit} type="submit" variant="contained">Save</Button>
      </Grid>
    </Grid>
  )
}

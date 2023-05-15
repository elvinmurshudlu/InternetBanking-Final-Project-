import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useState } from "react";
import { Authendication } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import { validate } from "../../validation/Validation";
import { Login, LoginError } from "../../Models/LoginRegister";
import { VisibilityOff, Visibility } from "@mui/icons-material";

import {  red } from "@mui/material/colors";

import { Button } from "@mui/material";

export default function LoginComponent() {
  let [userInformation, setUserInformation] = useState<Login>({
    email: "",
    password: "",
  });

  let [visibility, setVisibility] = useState(false);

  let [informationErrors, setInformationErrors] = useState<LoginError>({
    email: false,
    password: false,
  });

  let [error, setError] = useState(false);

  let navigate = useNavigate();

  function userCredentials(name: any, event: any) {
    let value = event.target.value;

    setUserInformation((prevInformation) => ({
      ...prevInformation,
      [name]: value,
    }));
  }

  function freeFromError() {
    let result = true;

    for (let a in userInformation) {
      let key = a as keyof typeof userInformation;

      if (!validate[key](userInformation[key])) {
        console.log("gsdfsf");
        result = false;
      }

      setInformationErrors((prevVal) => ({
        ...prevVal,
        [key]: !validate[key](userInformation[key]),
      }));
    }

    return result;
  }

  async function submit(e: Event) {
    e.preventDefault();


    if (freeFromError()) {
      try {
        let response = await Authendication.login(
          userInformation.email,
          userInformation.password
        );
        document.cookie = `TOKEN=${response.data}`;
        navigate("/");
      } catch (err: any) {
        setError(true);
      }
    }
  }

  let theme = createTheme({
    palette: {
      primary: {
        main: red[700],
        // dark:red[900]
      },
      secondary: {
        main: red[200],
        dark:red[800]

      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          alignItems: "center",
          rowGap: "15px",
        }}
      >
        <FormControl fullWidth margin="normal">
          <TextField
            error={informationErrors.email || error}
            onChange={(e) => userCredentials("email", e)}
            fullWidth
            id="email"
            required
            label="Email"
          ></TextField>
          {informationErrors.email && (
            <FormHelperText error>Email unvani daxil edin</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            error={informationErrors.password || error}
            onChange={(e) => userCredentials("password", e)}
            fullWidth
            type={visibility ? "text" : "password"}
            id="password"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setVisibility(!visibility)}>
                    {visibility ? (
                      <VisibilityOff></VisibilityOff>
                    ) : (
                      <Visibility></Visibility>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          {informationErrors.password && (
            <FormHelperText error>Password daxil edin</FormHelperText>
          )}

          {error && (
            <FormHelperText error>
              Istifadəçi adı və ya şifrə yanlışdır
            </FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={(e: any) => submit(e)}
          type="submit"
          // sx={{":hover":{backgroundColor:theme.palette.primary.dark}}}
          
          // sx={{backgroundColor:theme.palette.primary.dark}}
        >
          Login
        </Button>

        <span>və ya</span>

        <Button
          variant="outlined"          
          color="secondary"
          fullWidth
          size="large"
          onClick={() => navigate("/register")}
          type="submit"
        >
          Register
        </Button>
      </Box>
    </ThemeProvider>
  );
}

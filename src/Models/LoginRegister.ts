
export interface Login{
    "email":string,
    "password":string
}

export interface LoginError{
    "email":boolean,
    "password":boolean
}

export interface Register{
    "name":string,
    "surname":string,
    "email":string,
    "passwordRegister":string,
    "confirmPassword":string
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
      dashed: true;
    }
  }


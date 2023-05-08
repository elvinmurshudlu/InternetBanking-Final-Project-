class Validator{
    static email(email:any){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !regex.test(email)
    }

    static password(password:any){
            return (password.length == 0)
    }
}



export const validate:any = {
    "email":(email:any)=>{
        return Validator.email(email)
    },
    "password":(password:any)=>{
        return Validator.password(password)
    }
}

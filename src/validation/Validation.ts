class Validator{
    static email(email:any){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email)
    }

    static password(password:any){
            return (password.length != 0)
    }
    static person(name:string){
        return name.trim().length > 3
    }
}



export const validate:any = {
    "email":(email:any)=>{
        return Validator.email(email)
    },
    "password":(password:any)=>{
        return Validator.password(password)
    },
    "name":(name:any)=>{
        return Validator.person(name)
    },
    "surname":(surname:any)=>{
        return Validator.person(surname)
    },
    "passwordRegister":(password:any)=>{
        return Validator.password(password)
    },
    "confirmPassword":(password:any,confirmPassword:any)=>{
        if(password.trim() == "") return false
        return password === confirmPassword

    }
}

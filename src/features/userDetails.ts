import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { server, serverPort, serverUrls } from '../services/config'
import { IUserDetails } from '../Models/UserDetails'

export const userDetails = createApi({
    reducerPath:"userDetails",
    baseQuery:fetchBaseQuery({baseUrl:`${server+serverPort}`,
    prepareHeaders:(headers) =>{
        const cookie = document.cookie.split("=")[1]

        headers.set('Authorization', `${cookie}`)

        return headers;

    }

}),
    
    endpoints:(builder)=>(
        {
            getUserDetails:builder.query<IUserDetails,string>({
                query:()=>`${serverUrls.getUserDetails}`,
            })
            ,
            changeUserDetails:builder.mutation({
                query:(payload)=>({
                    url:serverUrls.changeDetails,
                    method:"POST",
                    body:payload,
                    headers:{
                        Authorization:document.cookie.split("=")[1]
                    }
                })
            })

        }
    )
})



export const {useGetUserDetailsQuery,useChangeUserDetailsMutation} = userDetails
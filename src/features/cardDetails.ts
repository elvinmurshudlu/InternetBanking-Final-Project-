import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { server, serverUrls } from "../services/config"
import { ICard } from "../Models/Card"


export const cardDetails = createApi({
    reducerPath:"cardDetails",
    baseQuery:fetchBaseQuery({
        baseUrl:server,
        prepareHeaders:(headers)=>{
            const cookie = document.cookie.split("=")[1]

            headers.set('Authorization', `${cookie}`)
    
            return headers;
        }
    }),
    tagTypes:["addCard"],
    endpoints:(builder)=>({

        
        getUserCards:builder.query<ICard[],string>({
            providesTags:["addCard"],
            
            query:()=>`${serverUrls.getCards}`,
        }),
        addUserCards:builder.mutation<any,any>({
            query:(payload)=>({
                url:serverUrls.addCard,
                method:"POST",
                body:payload,
                headers:{
                    Authorization:document.cookie.split("=")[1]
                }
            }),
            invalidatesTags:["addCard"],

        })
        
    })
})

export const {useGetUserCardsQuery ,useAddUserCardsMutation } = cardDetails
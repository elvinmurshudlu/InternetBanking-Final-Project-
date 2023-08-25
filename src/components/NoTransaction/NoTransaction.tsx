import React, {useContext} from 'react'
import {Box} from "@mui/material";
import {palette , ThemeApi} from "../../contextApi/ThemeContext";
import NoTransactionImg from "../../assets/logo/no-transaction.png"
import NoTransactionBlack from "../../assets/logo/no-transaction-black.png"

export default function NoTransaction() {

    const mode = useContext((ThemeApi))


    return (
        <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <img src={mode.mode ==='dark' ?   NoTransactionBlack : NoTransactionImg} alt=""/>
            <h2 style={{textAlign:'center', color:palette['textColor'][mode.mode]}}>No transactions yet</h2>
            <p style={{textAlign:'center', color:palette['textColor'][mode.mode]}}>Start transacting with your wallet. All transactions made will be displayed here.</p>

        </Box>
    )
}

import React from 'react'
import {Box} from "@mui/material";

export default function Transaction() {
    return (
        <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <h2 style={{textAlign:'center'}}>No transactions yet</h2>
            <p style={{textAlign:'center'}}>Start transacting with your wallet. All transactions made will be displayed here.</p>

        </Box>
    )
}

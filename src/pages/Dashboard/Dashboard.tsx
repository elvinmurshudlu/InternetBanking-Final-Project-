import { Box, Grid } from '@mui/material'
import React, { useState } from 'react'
import CardsContainer from '../../container/CardsContainer/CardsContainer'
import Section from '../../container/Section/Section'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import AccountsChart from '../../components/AccountsChart/AccountsChart'
import QuickTransfer from '../../components/QuickTransfer/QuickTransfer'

export default function Dashboard() {
  const [current,setCurrent] = useState(0)

  const transactions = useSelector((state:RootState)=>state.userTransactions.transactions)

  return (
    <Grid container rowSpacing={2} sx={{justifyContent:"space-between"}}>
      <Grid item xs={12} md={8}>
        <CardsContainer router={true} currentSlider={current} setCurrentSlider={setCurrent}></CardsContainer>

      </Grid>

      <Grid item xs={12} md={3}>
        <QuickTransfer></QuickTransfer>

      </Grid>

      <Grid item xs={12} md={6}>
          <AccountsChart header='Weekly activity' transactions={transactions}></AccountsChart>


      </Grid>
      
      

    </Grid>
  )
}

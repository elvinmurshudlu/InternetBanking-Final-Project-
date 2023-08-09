import {  Grid,  } from "@mui/material"
import  { useState ,useContext} from "react"
import CardsContainer from "../../container/CardsContainer/CardsContainer"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import AccountsChart from "../../components/AccountsChart/AccountsChart"
import QuickTransfer from "../../components/QuickTransfer/QuickTransfer"
import CreditChart from "../../components/CreditCardChart/CreditChart"
import { useGetUserCardsQuery } from "../../features/cardDetails"
import {palette,ThemeApi} from "../../contextApi/ThemeContext"

export default function Dashboard() {
  const [current, setCurrent] = useState(0)

const mode = useContext(ThemeApi)

  const transactions = useSelector(
    (state: RootState) => state.userTransactions.transactions
  )

  const { data: cards = [], isLoading,  } = useGetUserCardsQuery("")

  return (
    <Grid container rowSpacing={2} sx={{ justifyContent: "space-between" }}>
      <Grid item xs={12} md={8}>
        <CardsContainer
          cards={cards}
          isLoading={isLoading}
          router={true}
          currentSlider={current}
          setCurrentSlider={setCurrent}
        ></CardsContainer>
      </Grid>


      <Grid item xs={12} md={3} sx={{backgroundColor:palette.componentsBackground[mode.mode],borderRadius:'10px',padding:'10px',marginTop:'10px',display:'flex',justifyContent:'center'}}>
        <CreditChart
          isLoading={isLoading}
          cards={cards}
          transactions={transactions}
        ></CreditChart>
      </Grid>

      <Grid item xs={12} md={6} sx={{backgroundColor:palette.componentsBackground[mode.mode],color:palette.textColor[mode.mode],borderRadius:'10px',padding:'10px'}}>
        <AccountsChart
          isLoading={isLoading}
          header="Weekly activity"
          transactions={transactions}
        ></AccountsChart>
      </Grid>

      <Grid item xs={12} md={3}>
        <QuickTransfer></QuickTransfer>
      </Grid>
    </Grid>
  )
}

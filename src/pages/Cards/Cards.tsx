import { Box, Grid } from "@mui/material"
import {useContext, useState} from "react"
import CardsContainer from "../../container/CardsContainer/CardsContainer"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import CreditChart from "../../components/CreditCardChart/CreditChart"
import Section from "../../container/Section/Section"
import Settings from "../../components/CardSettings/Settings"
import { useGetUserCardsQuery } from "../../features/cardDetails"
import AddCard from "../../components/AddCard/AddCard"

import {dictionary} from "../../Language/lang";
import {LanguageApi} from "../../contextApi/LanguageContext";

export default function Cards() {
  const language = useContext(LanguageApi)
  const [currentCard, setCurrentCard] = useState(0)

  const {data:cards=[],isLoading} = useGetUserCardsQuery("")

  const transactions = useSelector(
    (state: RootState) => state.userTransactions.transactions
  )
 

  

  

  return (
    <Grid
      container
      sx={{ width: "100%", justifyContent: "space-between" }}
      rowSpacing={1}
    >
      <Grid item xs={11} md={7}>
        <CardsContainer
          currentSlider={currentCard}
          setCurrentSlider={setCurrentCard}
          cards={cards}
          isLoading={isLoading}
        ></CardsContainer>
      </Grid>

      <Grid item xs={12} md={4}>
        {cards.length && (
          <Section header="Card Settings">
            <Box sx={{ backgroundColor: "#FFF", borderRadius: "20px" }}>
              <Settings currentCard={cards[currentCard]}></Settings>
            </Box>
          </Section>
        )}
      </Grid>

      <Grid item xs={12} md={8} sx={{ padding: "0 20px 0 0" }}>
        <AddCard></AddCard>
       
      </Grid>

      <Grid item xs={12} md={3}>
        <CreditChart cards={cards} transactions={transactions}></CreditChart>
      </Grid>
    </Grid>
  )
}

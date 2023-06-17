import { Box, Button, Grid } from "@mui/material"
import React, { useState } from "react"
import CardsContainer from "../../container/CardsContainer/CardsContainer"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import CreditChart from "../../components/CreditCardChart/CreditChart"
import Section from "../../container/Section/Section"
import { Typography } from "@mui/material"
import { FormControl, TextField } from "@mui/material"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"

export default function Cards() {
  const [currentCard, setCurrentCard] = useState(0)
  const cards = useSelector((state: RootState) => state.userCards.cards)
  const transactions = useSelector(
    (state: RootState) => state.userTransactions.transactions
  )

  const [cardNumber,setCardNumber] = useState("")
  const [date, setDate] = useState()
  const [cardHolder,setCardHolder] = useState("")
  const [cvv,setCvv] = useState()

  if (date) {
    console.log(date["$D"])
    console.log(date["$y"])
  }


  function filterTargetCard(value: string) {
    const regex = /^[0-9\s]+$/
    if (regex.test(value) || value.trim() === "") {
      if (value.trim().length <= 19) {
        setCardNumber(cardNumberUI(value))
      }
    }
  }

  function cardNumberUI(value: string) {
    let result = ""
    value = value.split(" ").join("")
    const length = value.length
    for (let a = 0; a < length; a++) {
      result += value[a]
      if ((a + 1) % 4 === 0 && a + 1 !== length) {
        result += " "
      }
    }
    return result
  }


  function submit(e: any) {
    e.preventDefault()
  }

  return (
    <Grid container sx={{ width: "100%" }} rowSpacing={1}>
      <Grid item xs={11} md={12}>
        <CardsContainer
          currentSlider={currentCard}
          setCurrentSlider={setCurrentCard}
        ></CardsContainer>
      </Grid>

      <Grid item xs={12} md={8} sx={{ padding: "0 20px 0 0" }}>
        <Section header="Add New Card">
          <Box
            sx={{
              borderRadius: "20px",
              backgroundColor: "#FFF",
              padding: "30px",
            }}
          >
            <Typography
              gutterBottom
              sx={{ color: "#718EBF", fontWeight: "200" }}
              variant="subtitle2"
            >
              Credit Card generally means a plastic card issued by Scheduled
              Commercial Banks assigned to a Cardholder, with a credit limit,
              that can be used to purchase goods and services on credit or
              obtain cash advances.
            </Typography>
            <Grid
              component="form"
              container
              sx={{ justifyContent: "space-between" }}
              rowSpacing={2}
            >
              <Grid item xs={12} md={5.5}>
                <FormControl fullWidth>
                  <TextField value={cardNumber} onChange={(e:any)=>filterTargetCard(e.target.value)} label="Card Number"></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5.5}>
                <FormControl fullWidth>
                  <TextField onChange={(e:any)=>setCardHolder(e.target.value)} label="Name On Card"></TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={5.5}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker onChange={(value: any) => setDate(value)} />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={5.5}>
                <FormControl fullWidth>
                  <TextField onChange={(e:any)=>setCvv(e.target.value)} type="number" label="CVV"></TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={5.5}>
                <Button
                  onClick={submit}
                  type="submit"
                  variant="contained"
                  sx={{ padding: "10px 30px" }}
                >
                  Add Card
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Section>
      </Grid>

      <Grid item xs={12} md={4}>
        <CreditChart cards={cards} transactions={transactions}></CreditChart>
      </Grid>
    </Grid>
  )
}

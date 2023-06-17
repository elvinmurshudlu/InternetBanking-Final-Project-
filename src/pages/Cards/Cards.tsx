import { Box, Button, Grid } from "@mui/material"
import { useState } from "react"
import CardsContainer from "../../container/CardsContainer/CardsContainer"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store/store"
import CreditChart from "../../components/CreditCardChart/CreditChart"
import Section from "../../container/Section/Section"
import { Typography } from "@mui/material"
import { FormControl, TextField } from "@mui/material"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { ICardDetail, IDetailError } from "../../Models/Card"
import { FetchData } from "../../services/UserInformations"
import { fetchCards } from "../../features/cardsSlice"

import Settings from "../../components/CardSettings/Settings"

export default function Cards() {
  const [currentCard, setCurrentCard] = useState(0)
  const cards = useSelector((state: RootState) => state.userCards.cards)
  const transactions = useSelector(
    (state: RootState) => state.userTransactions.transactions
  )
  const [cardDetails, setCardDetails] = useState<ICardDetail>({
    cardNumber: "",
    cardHolder: "",
    cvv: "",
    date: "",
  })

  const [detailErrors, setErrors] = useState<IDetailError>({
    cardNumber: false,
    cardHolder: false,
    cvv: false,
    date: false,
  })

  function fillData(key: string, value: string) {
    setCardDetails((detail: ICardDetail) => ({ ...detail, [key]: value }))
  }

  function filterTargetCard(value: string) {
    const regex = /^[0-9\s]+$/
    if (regex.test(value) || value.trim() === "") {
      if (value.trim().length <= 19) {
        fillData("cardNumber", cardNumberUI(value))
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

  function freeFromError() {
    let result = true
    if (cardDetails.cardHolder.trim() === "") {
      result = false
      setErrors((err) => ({ ...err, ["cardHolder"]: true }))
    } else {
      setErrors((err) => ({ ...err, ["cardHolder"]: false }))
    }

    if (cardDetails.cardNumber.length < 19) {
      result = false
      setErrors((err) => ({ ...err, ["cardNumber"]: true }))
    } else {
      setErrors((err) => ({ ...err, ["cardNumber"]: false }))
    }

    if (cardDetails.cvv.length < 3) {
      result = false
      setErrors((err) => ({ ...err, ["cvv"]: true }))
    } else {
      setErrors((err) => ({ ...err, ["cvv"]: false }))
    }

    if (cardDetails.date === "") {
      result = false
      setErrors((err) => ({ ...err, ["date"]: true }))
    } else {
      setErrors((err) => ({ ...err, ["date"]: false }))
    }

    return result
  }

  const dispatch = useAppDispatch()

  async function submit(e: any) {
    e.preventDefault()

    if (freeFromError()) {
      try {
        await FetchData.addCard(cardDetails)
        dispatch(fetchCards())
      } catch {}
    }
  }

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
                  <TextField
                    error={detailErrors.cardNumber}
                    value={cardDetails.cardNumber}
                    onChange={(e: any) => filterTargetCard(e.target.value)}
                    label="Card Number"
                  ></TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5.5}>
                <FormControl fullWidth>
                  <TextField
                    error={detailErrors.cardHolder}
                    value={cardDetails.cardHolder}
                    onChange={(e: any) =>
                      fillData("cardHolder", e.target.value)
                    }
                    label="Name On Card"
                  ></TextField>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={5.5}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={cardDetails.date}
                      onChange={(value: any) => fillData("date", value)}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={5.5}>
                <FormControl fullWidth>
                  <TextField
                    error={detailErrors.cvv}
                    value={cardDetails.cvv}
                    onChange={(e: any) => fillData("cvv", e.target.value)}
                    type="number"
                    label="CVV"
                  ></TextField>
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

      <Grid item xs={12} md={3}>
        <CreditChart cards={cards} transactions={transactions}></CreditChart>
      </Grid>
    </Grid>
  )
}

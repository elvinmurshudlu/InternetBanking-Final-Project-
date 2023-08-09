import { Box, FormControl, Grid, TextField, Typography,Button,Skeleton } from "@mui/material";
import Section from "../../container/Section/Section";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ICardDetail, IDetailError } from "../../Models/Card";
import {useContext, useState} from "react"
import { useAddUserCardsMutation, useGetUserCardsQuery } from "../../features/cardDetails";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import {dictionary} from "../../Language/lang";
import {LanguageApi} from "../../contextApi/LanguageContext";
import {palette,ThemeApi} from '../../contextApi/ThemeContext'


export default function AddCard() {
  const language = useContext(LanguageApi)
  const {data:cards=[],refetch,isLoading,isFetching} = useGetUserCardsQuery("")

  const mode = useContext(ThemeApi)

  const [addUserCards] = useAddUserCardsMutation()


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
    
    
      async function submit(e: any) {
        e.preventDefault()
    
        if (freeFromError()) {
          try {
          let obj = {"cardHolder":cardDetails.cardHolder,"cardNumber":cardDetails.cardNumber.split(" ").join(""),
             "cvv":cardDetails.cvv,"date":cardDetails.date["$D"]+"/"+cardDetails.date["$y"]}
           addUserCards(obj)

          } catch {}
        }
      }

      if(isLoading ){
        return (
            <Skeleton variant="text"></Skeleton>
        )
      }


  return (
    <Section header="Add New Card">
    <Box
      sx={{
        borderRadius: "20px",
        backgroundColor: palette.componentsBackground[mode.mode],
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
            sx={{backgroundColor:palette.inputFields[mode.mode]}}
              error={detailErrors.cardNumber}
              value={cardDetails.cardNumber}
              onChange={(e: any) => filterTargetCard(e.target.value)}
              label={dictionary["Card number"][language.language]}
            ></TextField>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={5.5}>
          <FormControl fullWidth>
            <TextField
            sx={{backgroundColor:palette.inputFields[mode.mode]}}
              error={detailErrors.cardHolder}
              value={cardDetails.cardHolder}
              onChange={(e: any) =>
                fillData("cardHolder", e.target.value)
              }
              label={dictionary["Card holder"][language.language]}
            ></TextField>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={5.5}>
          <FormControl fullWidth>
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DatePicker
              sx={{padding:"0",fontSize:"10px",backgroundColor:palette.inputFields[mode.mode]}}
                value={cardDetails.date}
                onChange={(value: any) => fillData("date", value)}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={5.5}>
          <FormControl fullWidth>
            <TextField
            sx={{backgroundColor:palette.inputFields[mode.mode]}}
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
            sx={{ padding: "10px 30px",backgroundColor:palette.buttonBackground[mode.mode] }}
          >
            {dictionary["Add card"][language.language]}
          </Button>
        </Grid>
      </Grid>
    </Box>
  </Section>
  )
}

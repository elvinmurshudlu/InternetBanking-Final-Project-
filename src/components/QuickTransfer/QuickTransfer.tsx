import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Skeleton,
} from "@mui/material"
import {useContext, useState} from "react"
import { FetchData } from "../../services/UserInformations"
import { State } from "../../Models/LoginRegister"
import { Alert, Snackbar } from "@mui/material"
import { deepPurple } from "@mui/material/colors"
import { useGetUserCardsQuery } from "../../features/cardDetails"
import {dictionary} from "../../Language/lang";
import {LanguageApi} from "../../contextApi/LanguageContext";
import {palette,ThemeApi} from "../../contextApi/ThemeContext"


export default function QuickTransfer() {
  const { data: cards = [], isLoading } = useGetUserCardsQuery("")
  const [currentCard, setCurrentCard] = useState(0)
  const [amount, setAmount] = useState<string>("")
  const [targeCard, setTargetCard] = useState<string>("")
  const [cardHolder, setCardHolder] = useState("")
  const language = useContext(LanguageApi)
  const mode = useContext(ThemeApi)


  function handleChange(e: any) {
    setCurrentCard(e.target.value)
  }

  async function sendMoney(e: any) {
    e.preventDefault()
    if (validation()) {
      try {
        await FetchData.quickTransfer(
          cards[currentCard].cardNumber,
          targeCard,
          amount,
          cardHolder
        )
        handleClose(true)
      } catch {}
    }
  }

  function filterTargetCard(value: string) {
    const regex = /^[0-9\s]+$/

    if (regex.test(value) || value.trim() === "") {
      if (value.trim().length <= 19) {
        setTargetCard(cardNumberUI(value))
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

  const [errors, setErrors] = useState({
    selected: false,
    target: false,
    amount: false,
    cardHolder: false,
  })

  function validation() {
    const result = {
      selected: false,
      target: false,
      amount: false,
      cardHolder: false,
    }

    let acc = true

    if (targeCard.length < 19) {
      result.target = true
      acc = false
    } else {
      result.target = false
    }

    if (+amount === 0) {
      result.amount = true
      acc = false
    } else {
      result.amount = false
    }

    if (cardHolder.trim() === "") {
      result.cardHolder = true
      acc = false
    } else {
      result.cardHolder = false
    }

    setErrors(result)

    return acc
  }

  function amountFilter(value: string) {
    const regex = /^\d+$/

    // console.log(regex.test(value), value)

    if ((regex.test(value) || value.trim() === "") && +value.trim() < 999999999)
      setAmount(value.trim())
  }

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  })
  const { vertical, horizontal, open } = state

  function handleClose(isOpen: boolean) {
    setState((prevVal) => ({
      ...prevVal,
      ["open"]: isOpen,
    }))
  }

  if (isLoading) {
    return (
      <>
        <Skeleton variant="text" height={40}></Skeleton>
        <Skeleton variant="text" height={90}></Skeleton>
        <Skeleton variant="text" height={90}></Skeleton>
        <Skeleton variant="text" height={90}></Skeleton>
        <Skeleton variant="text" height={90}></Skeleton>
      </>
    )
  }

  return (
    <Box
        className={mode.mode}
      sx={{
        width: "100%",
        padding: "15px",
        backgroundColor: palette.componentsBackground[mode.mode],
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        color: "black",
      }}
    >
      
      <Typography variant="h6">{dictionary["Transfer money"][language.language]}</Typography>

      <Box component="form">
        <FormControl
          fullWidth
          sx={{
            marginBottom: "10px",
          }}
        >
          <InputLabel sx={{color:palette.textColor[mode.mode]}} size="small" id="cards-title">
            {dictionary["Select your card"][language.language]}
          </InputLabel>
          <Select
             className={mode.mode ==='dark' ? 'placeholder' :''}
            labelId="cards-title"
            label={dictionary["Select your card"][language.language]}
            onChange={(e) => handleChange(e)}
            error={errors.selected}
            size="small"
            sx={{backgroundColor:palette.inputFields[mode.mode]}}
          >
            {cards.length > 0 &&
              cards.map(
                (card, index) =>
                  card.isAvailable && (
                    <MenuItem value={index}>
                      {cardNumberUI(card.cardNumber)}
                    </MenuItem>
                  )
              )}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            marginBottom: "10px",
          }}
        >
          <TextField
            className={mode.mode ==='dark' ? 'placeholder' :''}
            sx={{backgroundColor:palette.inputFields[mode.mode]}}
            value={targeCard}
            onChange={(e) => filterTargetCard(e.target.value)}
            label={dictionary["Card number"][language.language]}
            error={errors.target}
            size="small"
            
          ></TextField>
        </FormControl>

        <FormControl
          fullWidth
          sx={{
            marginBottom: "10px",
          }}
        >
          <TextField
          sx={{backgroundColor:palette.inputFields[mode.mode]}}
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            label={dictionary["Card holder"][language.language]}
            error={errors.target}
            size="small"
          ></TextField>
        </FormControl>

        <FormControl
          fullWidth
          sx={{
            marginBottom: "25px",
          }}
        >
          <TextField
          sx={{backgroundColor:palette.inputFields[mode.mode]}}
            value={+amount.toLocaleString()}
            onChange={(e) => amountFilter(e.target.value)}
            label={dictionary["Amount"][language.language]}
            error={errors.amount}
            size="small"
          ></TextField>
        </FormControl>
        <Button
          onClick={(e) => sendMoney(e)}
          fullWidth
          size="large"
          variant="contained"
          type="submit"
          sx={{backgroundColor:palette.buttonBackground[mode.mode]}}
        >
          {dictionary["Send"][language.language]}
        </Button>
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical,
          horizontal,
        }}
        autoHideDuration={3000}
        onClose={() => handleClose(false)}
        open={open}
      >
        <Alert
          sx={{
            backgroundColor: deepPurple["900"],
          }}
          variant="filled"
          severity="success"
        >
          {dictionary["Transfer succesfully"][language.language]}
        </Alert>
      </Snackbar>
    </Box>
  )
}

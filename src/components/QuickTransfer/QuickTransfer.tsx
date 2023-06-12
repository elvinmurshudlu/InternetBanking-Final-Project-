import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import Card from "../Card/Card"
import { RootState } from "../../store/store"
import { FetchData } from "../../services/UserInformations"
import { State } from "../../Models/LoginRegister"
import { Alert, Snackbar } from "@mui/material"
import { blue, deepPurple } from "@mui/material/colors"
import { ICard } from "../../Models/Card"

export default function QuickTransfer() {
  const cards = useSelector((state: RootState) => state.userCards.cards)
  
  const [currentCard, setCurrentCard] = useState(0)

  const [amount, setAmount] = useState<string>("")

  const [targeCard, setTargetCard] = useState<string>("")

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
          amount
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
  })

  function validation() {
    const result = { selected: false, target: false, amount: false }

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

    setErrors(result)

    return acc
  }

  function amountFilter(value: string) {
    const regex = /^\d+$/

    console.log(regex.test(value), value)

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

  return (
    <Box
      sx={{
        width: "100%",
        padding: "15px",
        backgroundColor: `rgba(81,45,168,0.6)`,
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        color: "white",
      }}
    >
      <Typography variant="h5" gutterBottom>
        My Wallet
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "190px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {cards.length > 0 && (
          <Card
            cardInformation={cards[currentCard]}
            color={blue["A700"]}
          ></Card>
        )}
      </Box>
      <Typography variant="h6" gutterBottom>
        Quick Transfer
      </Typography>

      <Box component="form">
        <FormControl
          fullWidth
          sx={{
            marginBottom: "10px",
          }}
        >
          <InputLabel id="cards-title">Select your card</InputLabel>
          <Select
            labelId="cards-title"
            label="Select your card"
            onChange={(e) => handleChange(e)}
            error={errors.selected}
          >
            {cards.length > 0 &&
              cards.map((card, index) => (
                <MenuItem value={index}>
                  {cardNumberUI(card.cardNumber)}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          sx={{
            marginBottom: "10px",
          }}
        >
          <TextField
            value={targeCard}
            onChange={(e) => filterTargetCard(e.target.value)}
            label="Card Number"
            error={errors.target}
          ></TextField>
        </FormControl>

        <FormControl
          fullWidth
          sx={{
            marginBottom: "25px",
          }}
        >
          <TextField
            value={+amount.toLocaleString()}
            onChange={(e) => amountFilter(e.target.value)}
            label="Amount"
            error={errors.amount}
          ></TextField>
        </FormControl>
        <Button
          onClick={(e) => sendMoney(e)}
          fullWidth
          size="large"
          variant="contained"
          type="submit"
        >
          Send
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
          Transfer succesfully
        </Alert>
      </Snackbar>
    </Box>
  )
}

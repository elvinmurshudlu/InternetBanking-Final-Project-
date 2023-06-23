export const serverIp = "192.168.0.101"
// export const serverIp = "192.168.42.195"

export const server = `http://${serverIp}`

export const serverPort = ":3200"

export const serverUrls = {
  loginRequest: "/login",
  registerRequest: "/register",
  isLogged: "/logged",
  getCards: "/getCards",
  quickTransfer: "/transferMoney",
  addCard:"/addNewCard",
  cardAvailability:"/setCardUsage",
  getUserDetails:"/userDetails",
  changeDetails:"/changeDetails"
}

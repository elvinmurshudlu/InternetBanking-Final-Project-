import { RouterProvider } from "react-router-dom"
import { routes } from "./routes/route"
import { Provider } from "react-redux"
import store from "./store/store"

function App() {
  return (
    <Provider store={store}>
      
      <RouterProvider router={routes}></RouterProvider>
      
    </Provider>
  )
}  

export default App

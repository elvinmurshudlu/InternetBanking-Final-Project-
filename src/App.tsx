import { RouterProvider } from "react-router-dom"
import { routes } from "./routes/route"
import { Provider } from "react-redux"
import store from "./store/store"
import LanguageContext from "./contextApi/LanguageContext";

function App() {
  return (
    <Provider store={store}>
      
      <LanguageContext>
          <RouterProvider router={routes}></RouterProvider>
      </LanguageContext>
      
    </Provider>
  )
}  

export default App

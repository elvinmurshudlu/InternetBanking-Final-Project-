import { RouterProvider } from "react-router-dom"
import { routes } from "./routes/route"
import { Provider } from "react-redux"
import store from "./store/store"
import LanguageContext from "./contextApi/LanguageContext";
import ThemeContext from "./contextApi/ThemeContext";

function App() {
  return (
    <Provider store={store}>
      <ThemeContext>
          <LanguageContext>
              <RouterProvider router={routes}></RouterProvider>
          </LanguageContext>
      </ThemeContext>
    </Provider>
  )
}  

export default App

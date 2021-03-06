import { render } from "react-dom"
import App from "./App"
import "./styles/index.scss"
import store from "./redux"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import "react-aspect-ratio/aspect-ratio.css"

const rootElement = document.getElementById("root")
render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
)

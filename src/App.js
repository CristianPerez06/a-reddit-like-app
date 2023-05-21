import React from "react"
import { MainRouter } from "./routers"
import { Provider } from "react-redux"
import store from "./store"

const App = () => {
  return (
    <div className="app w-100 h-100 d-flex justify-content-center">
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </div>
  )
}

export default App

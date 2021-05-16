import React from 'react'
import { MainRouter } from './routers'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <div className='App w-100 h-100 p-2'>
      <Provider store={store}>
        <MainRouter />
      </Provider>
    </div>
  )
}

export default App

import * as React from 'react'
import { render } from 'react-dom'
import { StoreContext } from 'redux-react-hook'

import './index.less'

import { configureStore } from './modules'
import Routes from './routes'


const App = () => (
  <StoreContext.Provider value={configureStore()}>
    <Routes />
  </StoreContext.Provider>
)

render(<App />, document.getElementById('app'))

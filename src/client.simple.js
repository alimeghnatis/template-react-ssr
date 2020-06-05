import * as React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import { loadableReady } from '@loadable/component'

import App from 'site/App'

//import Clock from 'components/Clock'


import '@fwrlines/alphabet-scss/main.scss'

//const isProduction = !(process.env.DEBUG === 'true')


const rootElement = document.getElementById('main')

const jsx = (
  <BrowserRouter>
	    <App />
  </BrowserRouter>
)

/* When main pagedelivered by SSR, not sure why, js is loaded twice for Loadable components
  console.log(rootElement.hasChildNodes(), rootElement.innerHTML) */

loadableReady(() => {
  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrate(
      jsx,
      rootElement)
  }
  else {
    ReactDOM.render(
      jsx,
      rootElement)
  }


})

if (module.hot) {
  module.hot.accept()
}

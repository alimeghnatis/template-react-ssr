import * as React from 'react'
import ReactDOM from 'react-dom'


import { ApolloProvider } from '@apollo/client'
import { getClient } from 'graphql/getClient'
import { BrowserRouter } from 'react-router-dom'

import { loadableReady } from '@loadable/component'

import { SiteContextProvider } from '@fwrlines/ds'

import { IntlProvider } from 'react-intl'

import localizedMessages from 'translations/it.json'

import siteContextConfig from 'config/siteContext'

import App from 'site/App'


//import Clock from 'components/Clock'


import '@fwrlines/alphabet-scss/main.scss'

//const isProduction = !(process.env.DEBUG === 'true')

const client = getClient(process.env.GRAPHQL_ENDPOINT)

const rootElement = document.getElementById('main')


const jsx = (
  <ApolloProvider
    client={client}
  >
    <BrowserRouter>
      <SiteContextProvider
        config={siteContextConfig}
        initialTheme="system"
      >
        <IntlProvider
          locale={'it'}
          messages={localizedMessages}
        >
	        <App />
        </IntlProvider>
      </SiteContextProvider>
    </BrowserRouter>
  </ApolloProvider>
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

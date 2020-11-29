import packageInfo from '../../package.json'
import React, { useState, useContext } from 'react'
//import Prototypes from 'prototypes' //Capitalize, etc
import { Switch, Redirect, Route, Link } from 'react-router-dom'

//import NotFound from './NotFound.js'

//import oAuth2Routes from './oauth2/routes'
//import Clock from 'ui/test/AsyncClock'
//import QueryTester from 'ui/test/QueryTester'
//import { MyProfile } from 'ui/local/dashboardMain'

import {
  GreenTick,
  Subtitle,
  ThemeSelector,
  AnimatedVCaret,
  Paginator,
  HorizontalBar,
  SwitchRouteMap,
  RedirectWithStatus,
  GraphQLTester,
  useSite
} from '@fwrlines/ds'

/* @fwrlines/generator-react-component 2.2.3 */
import { defineMessages, FormattedMessage } from 'react-intl'

const endpoint = process.env.GRAPHQL_ENDPOINT

const messages = defineMessages({
  welcome:{
    id            :'app.default.welcome',
    defaultMessage:'Welcome to { name } version { version }',
    description   :'Default message'
  },
  successfullyInstalled:{
    id            :'app.default.successfullyInstalled',
    defaultMessage:`If you're seeing this, it means the application runs correctly.`,
    description   :''
  },
  graphqlNotInstalled:{
    id            :'app.default.graphqlNotInstalled',
    defaultMessage:`This app does not use GraphQL.`,
    description   :''
  },
  graphqlInstalled:{
    id            :'app.default.graphqlInstalled',
    defaultMessage:`This app uses GraphQL at endpoint {endpoint}. A hello message from the server should appear below.`,
    description   :''
  }
})


import routes from './allRoutes.js'

const App = () => {
  const [active, setActive] = useState(false)

  const {
    userTheme
  } = useSite()

  return (
    <div
      className={
        [
          'ui-'+ userTheme,
          'y-background b-y'
        ].filter(e => e).join(' ')
      }
      style={{
        height        :'100%',
        display       :'flex',
        flexDirection :'column',
        justifyContent:'center',
        alignItems    :'center',
        background    :'var(--background)'
      }}
    >
      <div style={{
        position:'absolute',
        top     :'1em',
        right   :'1em'
      }}
      >
        <ThemeSelector className="c-link" />
      </div>
      <div
        style={{
          width    :'500px',
          //background:'red',
          textAlign:'center'
        }}
      >
        <h1>
          <FormattedMessage
            {...messages.welcome}
            values={{
              version:packageInfo.version,
              name   :packageInfo.name
            }}
          />
        </h1>
        <GreenTick style={{
          height      :'12em',
          marginBottom:'1em'
        }}
        />
        <Subtitle>
          <FormattedMessage
            {...messages.successfullyInstalled}
          />
        </Subtitle>
        { endpoint ?
          <>
            <Subtitle>

              <FormattedMessage
                {...messages.graphqlInstalled}
                values={{
                  endpoint
                }}
              />
            </Subtitle>
            <GraphQLTester />
          </> :
          <Subtitle>
            <FormattedMessage
              {...messages.graphqlNotInstalled}
            />
          </Subtitle>
        }
      </div>
      <SwitchRouteMap
        routes={routes}

        /*
        NotFound={<RedirectWithStatus
          status={404}
          to={'/404'}
                  />}
         */
      />
    </div>
  )
}


export default App

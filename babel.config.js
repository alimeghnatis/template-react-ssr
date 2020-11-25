let path = require('path')

module.exports = function (api) {
  //api.cache(false)

  let isProd = api.cache(() => process.env.NODE_ENV === 'production')
  let isBackend = process.env.BACKEND ==='true'
  let isCompileForSSR = process.env.COMPILE_FOR_SSR === 'true'
  console.log(`OK => Compiling in Babel`)
  console.log(`OK => NODE_ENV=${process.env.NODE_ENV} (used as isProd=${isProd})`)
  console.log(`OK => BACKEND=${isBackend} (used as isBackend)`)
  console.log(`OK => COMPILE_FOR_SSR=${isCompileForSSR} (used as isCompileForSSR)`)

  const presets = [
    [
      '@babel/preset-env',
      {
        modules:isBackend ? 'cjs' : 'auto',
        targets:isBackend ? {
          node:12
        } : {
          esmodules:true
        }
        //debug:true
      }
    ],
    '@babel/preset-react'
  ]
  const plugins = [
    'inline-dotenv',
    [
      'module-resolver', {
        root :['./src'],
        alias:{
          //Alias defined here create a weird bug where babel runtime imports esm helpers in cjs output mode
          //Alias should be defined in webpack (dev-server or compile time) or in a module alias patch (nodemon babel-node)
        }
      }
    ],
    '@babel/plugin-proposal-class-properties',
    ['babel-plugin-inline-import',
      {
        extensions:[
          '.html',
          '.xml',
          '.graphql',
          '.gql'
        ]
      }
    ],
    [
      'react-intl',
      {
        messagesDir:'./src/translations/messages'
      }
    ],
    [
      'react-intl-extractor',
      {
        extractedFile:'./src/translations/aggregated.json',
        langFiles    :[{
          path              :'./src/translations/it.json',
          cleanUpNewMessages:true
        }, {
          path              :'./src/translations/en.json',
          cleanUpNewMessages:false
        }]
      }
    ],
    '@loadable/babel-plugin'
  ]

  isProd && plugins.push(
    'transform-react-remove-prop-types',
  )

  //['add-module-exports']


  return {
    presets,
    plugins
  }
}

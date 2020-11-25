import * as React from 'react'

import ReactDOMServer from 'react-dom/server' //Not in use if we use apollo own renderer


import { ChunkExtractor } from '@loadable/server'

import { StaticRouter } from 'react-router-dom'

import { Helmet } from 'react-helmet'

import BaseApp from 'app/BaseApp'

import template from '../../public/index.html'

import stats from '../../public/loadable-stats.json'


/* const statsFile = path.resolve(__dirname, '../dist/loadable-stats.json')
   We create an extractor from the statsFile */

const routerContext = {}

const render = ReactDOMServer.renderToString

export default async(req, res) => {

  const extractor = new ChunkExtractor({ stats })

  const appJsx=(
    <StaticRouter
      location={req.originalUrl || req.url}
      context={routerContext}
    >
	    <BaseApp />
    </StaticRouter>
  )

  const html = await render(
    //extractor.collectChunks(appJsx)
    appJsx
  )


  /* eslint-disable no-console */
  console.log(req.method, ' ', req.originalUrl || req.url, JSON.stringify(routerContext))
  /* eslint-enable no-console */


  // You can now collect your script tags

  const scriptTags = extractor.getScriptTags() // or extractor.getScriptElements();
  // console.log('SCRIPT', extractor.getScriptTags())

  // You can also collect your "preload/prefetch" links

  const linkTags = extractor.getLinkTags() // or extractor.getLinkElements();

  // And you can even collect your style tags (if you use "mini-css-extract-plugin")

  const styleTags = extractor.getStyleTags() // or extractor.getStyleElements();

  const helmet = Helmet.renderStatic()

  return res.send(
    template
      .replace('<div id="main"></div>', `<div id="main">${html}</div>`)
      .replace('</body>', scriptTags + '</body>')
      .replace('<title></title>', helmet.title.toString() + helmet.meta.toString() + linkTags + styleTags)
      .replace(/(\r\n|\n|\r)/gm,'') //Minification
      .replace(/\s\s+/g, '') // Minification
  )

}



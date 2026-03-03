import React from 'react'
import express from 'express'
import fs from 'fs'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { ServerStyleSheet } from 'styled-components'

import { App } from '../src/App'

const app = express()
const PORT = 3001

app.use('/', (req, res) => {
  fs.readFile(
    path.resolve(__dirname, '../dist/index.html'),
    'utf-8',
    (err, data) => {
      if (err) {
        console.error(err)
        return res.status(500).send('File reading error')
      }

      const sheet = new ServerStyleSheet()

      try {
        const html = renderToString(
          sheet.collectStyles(
            <StaticRouter location={req.url}>
              <App />
            </StaticRouter>
          )
        )
        const styleTags = sheet.getStyleTags()

        const serverHtml = data
          .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
          .replace('<head>', `<head>${styleTags}`)

        return res.send(serverHtml)
      } catch (err) {
        console.error(err)
        return res.status(500).send('SSR error')
      } finally {
        sheet.seal()
      }
    }
  )
})

app.use(express.static(path.resolve(__dirname, '../dist')))

app.listen(PORT, () => {
  console.log(`SSR is running on port ${PORT}`)
})

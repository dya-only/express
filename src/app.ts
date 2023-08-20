import express from 'express'

const app = express()
const port = process.env.PORT || 3000
const log = console.log

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const api = require('./routes/init')
app.use('/api', api)

app.listen(port, () => {
  log(`
  ########################################
  #    Server listening on port: ${ port }    #
  ########################################`)
})
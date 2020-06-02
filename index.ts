import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import logger from 'morgan'
import gigantti from './routes/'
const API_PORT = process.env.PORT || 3000
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/api', gigantti)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`))

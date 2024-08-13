const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
// const notesRouter = require('./controllers/notes')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const authRouter = require('./controllers/auth')
const usersRouter = require('./controllers/users')
const productRouter = require('./controllers/product')
const cartRouter =require('./controllers/cart')
const orderRouter = require('./controllers/order')
const stripeRoute = require('./controllers/stripe')
const contactRouter = require('./controllers/contact')
mongoose.set('strictQuery', false)


const url = config.MONGODB_URI


logger.info('connecting to db')

mongoose.connect(url)

  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })



app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// app.use('/api/notes', notesRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/orders', orderRouter)
app.use("/api/checkout", stripeRoute)
app.use('/api/contact', contactRouter);

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
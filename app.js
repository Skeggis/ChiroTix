require('dotenv').config();
const express = require('express');
const passport = require('passport');
const path = require('path')
var cors = require('cors')

const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });


const {connectSocket} = require('./js/socket')
const {
  errorHandler,
  notFoundHandler
} = require('./js/helpers.js')

let Queue = require('bull');
let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const workQueue = new Queue('work', REDIS_URL);


const eventRouter = require('./js/routers/eventRouter')
const tagsRouter = require('./js/routers/tagsRouter')
const ticketRouter = require('./js/routers/ticketRouter')
const searchRouter = require('./js/routers/searchRouter')
const orderRouter = require('./js/routers/orderRouter')
const userRouter = require('./js/routers/userRouter')
const adminRouter = require('./js/routers/adminRouter')


const app = express();
app.use(Sentry.Handlers.requestHandler()); //Sentry must be first middleware
app.use(cors({
  origin: '*' //Change before prod!
})) //Just for development! //Set options to only allow our frontend


app.use(express.json());
require('./js/passport')(passport);
app.use(passport.initialize());

if(process.env.PRODUCTION === 'true'){
  app.disable('x-powered-by')
  app.use(express.static(path.resolve(__dirname, 'client/build')))
  app.get('*', (req,res, next)=>{
    if(req.path.match(/^\/api\//)){
      next()
    } else {
      console.log("HERE?")
      res.sendFile(path.resolve(__dirname,'client/build', 'index.html'))
    }
  })
}

app.use('/api',searchRouter)
app.use('/api',eventRouter)
app.use('/api',tagsRouter)
app.use('/api',ticketRouter)
app.use('/api',orderRouter)
app.use('/api',userRouter)
app.use('/api',adminRouter)

app.use(Sentry.Handlers.errorHandler());
app.use(notFoundHandler)
app.use(errorHandler)



app.set('workQueue', workQueue)


const {
  PORT: port = 5000,
  HOST: host = '127.0.0.1',
} = process.env;
let server = app.listen(port, () => {
  if (host) {
    console.info(`Server running at http://${host}:${port}/`);
  }
});


connectSocket(server, app)

workQueue.on('global:completed', (jobId, result) => {
  const io = app.get('io')
  const jsonResult = JSON.parse(result)
  const socket = io.sockets.connected[jsonResult.socketId]
  console.log('Emiiting paymentProcessed')
  socket.emit('paymentProcessed', jsonResult.result)
});


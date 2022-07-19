const express = require('express');
require('dotenv').config();
const connetDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const morgan = require('morgan');
const { default: helmet } = require('helmet');


//initilize app here
const app = express();

const port = process.env.PORT || 3000

//conntct to database
connetDB()

//testing route
app.get("/", (req, res) => {
    res.send("welcome to my app")
})

//middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(errorHandler)


//routes
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/company', require('./routes/companyRoute'));
app.use('/api/intership', require('./routes/intershipRoute'))
app.use('/api/application', require('./routes/applicationRoute'))


app.listen(port, () => console.log("app is runing on port ", port))




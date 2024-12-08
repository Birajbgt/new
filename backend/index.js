// importing the packages. (express.)
const express = require('express');
// importing the packages. (mangoose.)
const mongoose = require('mongoose')
// importing the data base
const connectDatabase = require('./database/database');
// importing the dotenv
const dotenv = require('dotenv');
// importing cors  to link with frontend (its a policy)
const cors = require('cors');
// importing express-fileupload
const acceptFOrmData = require('express-fileupload')

// creating an express application. 
const app = express();
app.use(express.json())

//configure cors policy
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200,

}
app.use(cors(corsOptions))

//dotenv configuration
dotenv.config()


// config from data
app.use(acceptFOrmData())
// make static form data 
app.use(express.static('./public'));


//defining the port .
const PORT = process.env.PORT;;


//connecting to databas 
connectDatabase()


//making a test endpoint.
app.get('/test', (req, res) => {
    res.send('Hello World, test api is working.');
})

//configuring routes
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/task', require('./routes/taskRoutes'))





// starting the server. 
app.listen(PORT, () => {
    console.log(`Server - app is running on port ${PORT}`);
});
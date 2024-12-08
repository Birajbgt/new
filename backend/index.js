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

//defining the port .
const PORT = process.env.PORT;;

require("./utils/cronJobs");
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
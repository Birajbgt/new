
const router = require("express").Router();
const userController = require('../controller/userControllers')

// Creating user registration route
router.post('/create', userController.createUser)


//login routes
router.post('/login', userController.loginUser)

//Exporting the routes
module.exports = router;
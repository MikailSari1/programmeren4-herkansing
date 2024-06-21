const express = require('express')
const assert = require('assert')
const router = express.Router()
const userController = require('../controllers/user.controller')
const logger = require('../util/logger')
const validateToken = require('./authentication.routes').validateToken



// Userroutes
router.post('/api/user', validateToken, userController.create)
router.get('/api/user', validateToken, userController.getAll)
router.get('/api/user/profile', validateToken, userController.getProfile)
router.get('/api/user/:userId', validateToken, userController.getById)
router.put('/api/user/:userId', validateToken, userController.updateUser);
router.delete('/api/user/:userId', validateToken, userController.deleteUser);

module.exports = router
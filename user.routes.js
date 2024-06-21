const express = require('express')
const assert = require('assert')
const router = express.Router()
const userController = require('../controllers/user.controller')
const logger = require('../util/logger')
const validateToken = require('./authentication.routes').validateToken



// Userroutes
router.post('/api/user', validateToken, userController.create)
router.get('/api/user', userController.getAll)
router.get('/api/user/profile', userController.getProfile)
router.get('/api/user/:userId', userController.getById)
router.put('/api/user/:userId', userController.updateUser);
router.delete('/api/user/:userId', userController.deleteUser);

module.exports = router
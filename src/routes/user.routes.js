const express = require('express')
const assert = require('assert')
const router = express.Router()
const userController = require('../controllers/user.controller')
const logger = require('../util/logger')
const validateToken = require('./authentication.routes').validateToken

const validateUserCreateChaiExpect = (req, res, next) => {
    try {
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            isActive,
            street,
            city,
            phoneNumber,
            roles,
        } = req.body;

        assert.ok(typeof firstName === 'string', 'firstName should be a string');
        assert.strictEqual(typeof firstName, 'string', 'firstName should be a string');

        assert.ok(typeof lastName === 'string', 'lastName should be a string');
        assert.strictEqual(typeof lastName, 'string', 'lastName should be a string');

        assert.ok(typeof emailAddress === 'string', 'emailAddress should be a string');
        assert.strictEqual(typeof emailAddress, 'string', 'emailAddress should be a string');
        assert.ok(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(emailAddress), 'emailAddress should match the pattern');

        assert.ok(typeof password === 'string', 'password should be a string');
        assert.strictEqual(typeof password, 'string', 'password should be a string');
        assert.ok(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(password), 'password should match the pattern');

        assert.ok(typeof isActive === 'boolean', 'isActive should be a boolean');
        assert.strictEqual(typeof isActive, 'boolean', 'isActive should be a boolean');

        assert.ok(typeof street === 'string', 'street should be a string');
        assert.strictEqual(typeof street, 'string', 'street should be a string');

        assert.ok(typeof city === 'string', 'city should be a string');
        assert.strictEqual(typeof city, 'string', 'city should be a string');

        assert.ok(typeof phoneNumber === 'string', 'phoneNumber should be a string');
        assert.strictEqual(typeof phoneNumber, 'string', 'phoneNumber should be a string');
        assert.ok(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(phoneNumber), 'phoneNumber should match the pattern');

        assert.ok(Array.isArray(roles), 'roles should be an array');
        assert.strictEqual(Array.isArray(roles), true, 'roles should be an array');

        // If all assertions pass, move to the next middleware
        next();
    } catch (err) {
        // If any assertion fails, send a 400 response with the error message
        res.status(400).json({ message: err.message });
    }
};


// Userroutes
router.post('/api/user', validateUserCreateChaiExpect, userController.create);
router.get('/api/user', validateToken, userController.getAll);
router.get('/api/user/profile', validateToken, userController.getProfile);
router.get('/api/user/:userId', validateToken, userController.getById);
router.put('/api/user/:userId', validateToken, userController.updateUser);
router.delete('/api/user/:userId', validateToken, userController.deleteUser);

module.exports = router
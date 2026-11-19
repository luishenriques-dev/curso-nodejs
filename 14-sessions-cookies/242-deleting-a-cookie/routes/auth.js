const path = require('path');

const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// /auth/login => GET
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);


module.exports = router;

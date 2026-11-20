const path = require('path');

const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// /auth/login => GET
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;

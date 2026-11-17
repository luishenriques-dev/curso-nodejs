const path = require('path');

const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

// /auth/login => GET
router.get('/login', authController.getLogin);
   



module.exports = router;

const path = require('path');
const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

// / => GET
router.get("/", (req, res, next) => { 
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

// /users => GET
router.get("/users", (req, res, next) => { 
    res.sendFile(path.join(rootDir, 'views', 'users.html'));
});

module.exports = router;
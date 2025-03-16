const express = require('express');
const  explorePopularRepos = require('../controllers/explore.controller');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

router.get( '/repos/:language', explorePopularRepos );

module.exports = router;
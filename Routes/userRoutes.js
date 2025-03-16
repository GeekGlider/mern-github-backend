const express = require('express');
const {getUserprofileandRepos,likeprofile,getlikes} = require('../controllers/user.controller');
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const router = express.Router();

router.get( '/profile/:username', getUserprofileandRepos);
router.get( '/likes', ensureAuthenticated, getlikes );
router.post('/like/:username', ensureAuthenticated, likeprofile );

module.exports = router;
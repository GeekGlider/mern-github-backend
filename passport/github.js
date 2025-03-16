const passport = require('passport');
const dotenv = require('dotenv');
const { Strategy } = require('passport-github2');
const User = require('../models/User');

dotenv.config();

passport.serializeUser(function(user, done) {
  done(null, user); // Serialize only the user ID
});

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id); // Fetch user by ID during deserialization
//     done(null, user);
//   } catch (error) {
//     console.error('Error deserializing user:', error);
//     done(error, null);
//   }
// });
passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });


passport.use(new Strategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/github/callback",
},
 async function(accessToken, refreshToken, profile, done) {
  const user = await User.findOne({ username: profile.username });
			// signup
			if (!user) {
				const newUser = new User({
					name: profile.displayName,
					username: profile.username,
					profileUrl: profile.profileUrl,
					avatarUrl: profile.photos[0].value,
					likedProfiles: [],
					likedBy: [],
				});
				await newUser.save();
				done(null, newUser);
			} else {
				done(null, user);
			}
}));


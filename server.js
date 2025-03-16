const express = require('express');
const app = express();
require('./passport/github');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const userRoutes = require('./Routes/userRoutes');
const exploreRoutes = require('./Routes/exploreRoutes');
const authRoutes = require('./Routes/authRoutes');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require("path");

// Load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;
// Passport and session configuration
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// CORS configuration

app.use(cors());

// Route handlers
app.use('/api/users', userRoutes);
app.use('/api/explore', exploreRoutes);
app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('DB connected successfully'))
  .catch(err => console.error('DB connection error:', err));


// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

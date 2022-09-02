// import mongoose and express
const mongoose = require('mongoose');
const express = require('express');

// define app and PORT
const app = express();
const PORT = process.env.PORT || 3001;


// express uses JSON urlencoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// app will be using the routes
app.use(require('./routes'));

// connection for mongoose
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_network', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

// listening for the PORT connection
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

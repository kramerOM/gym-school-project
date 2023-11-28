const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');

//importation of models
const Subscription = require('./models/subscriptionmodel');

//importation of routes
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const staffRoute = require('./routes/staff');
const server = express();



mongoose.connect('mongodb://127.0.0.1:27017/gymsystem');

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(express.json());
server.use(loginRoute);
server.use(signupRoute);
server.use(staffRoute);




const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    
    return next();
  }
  
  res.status(401).json({ error: 'Unauthorized' });
};

server.get('/', (req, res) => {
  res.render('login');
});

server.get('/home', /*isAuthenticated,*/ (req, res) => {
  res.render('home')
 // res.status(200).json({ message: `Welcome, ${req.session.user.email}!` });
});
server.get('/Login', (req, res) => {
 res.render('login');
});

server.get('/Signup', (req, res) => {
  res.render('signup')
});

server.get('/staff', (req, res) => {
  res.render('staff')
});

server.get(`/staffdashboard`,  (req, res) => {
  res.render('staffdashboard')
});

server.get(`/subscription`, (req, res) => {
  res.render(`subscription`)
})

server.post('/logout', isAuthenticated, (req, res) => {
  // Destroy the session to log out the user
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

server.post('/api/subscribe/daily', async (req, res) => {
  try {
    const { user } = req.body;
    await Subscription.create({ plan: 'daily', user });
    res.json({ message: 'Subscription to daily plan successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.post('/api/subscribe/weekly', async (req, res) => {
  try {
    const { user } = req.body;
    await Subscription.create({ plan: 'weekly', user });
    res.json({ message: 'Subscription to weekly plan successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.post('/api/subscribe/monthly', async (req, res) => {
  try {
    const { user } = req.body;
    await Subscription.create({ plan: 'monthly', user });
    res.json({ message: 'Subscription to monthly plan successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

server.listen(5000, () => {
  console.log('server is working on port 5000');
});

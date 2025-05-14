const express = require('express');
const app = express();

// 0. BASIC MIDDLEWARE
// app.use((req, res) => {
//   let { query } = req.query;
//   console.log(query);
//   console.log('Hi, I am middleware');
//   res.send('middleware finished');
// });

// 1. BASIC MIDDLEWARE WITH NEXT
// app.use((req, res, next) => {
//   console.log('Hi, I am 1st middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Hi, I am 2nd middleware');
//   next();
// });

// 2. UTILITY MIDDLEWARE
//Utility Middleware (logger: log(prints useful info on console))
// app.use((req, res, next) => {
//   req.time = new Date(Date.now()); // user defined parameter
//   console.log(req.method, req.hostname, req.path, req.time); // parameters from req object
//   next();
// });

// 3. SPECIFIED CALLBACK
// this middleware only works for path that starts with /random
// app.use('/random', (req, res, next) => {
//   console.log('i am only for random');
//   next();
// });

// if path is not specified that means it will works for all the path "/"
// app.use((req, res, next) => {
//   console.log('i am only for random');
//   next();
// });

// 4. CHECKING ACCESS TOKEN
// Middleware for checking Access for API Token as Query String
// app.use('/api', (req, res, next) => {
//   let { token } = req.query;
//   if (token === 'giveaccess') {
//     next();
//   }
//   res.send('ACCESS DENIED!');
// });

// app.get('/api', (req, res) => {
//   res.send('data');
// });

// 5. MULTIPLE MIDDLEWARES
// passing middleware as a function
// const checkToken = (req, res, next) => {
//   let { token } = req.query;
//   if (token === 'giveaccess') {
//     next();
//   }
//   res.send('ACCESS DENIED!');
// };

// app.get('/api', checkToken, (req, res) => {
//   res.send('data');
// });

app.get('/', (req, res) => {
  res.send('I am root.');
});

app.get('/random', (req, res) => {
  res.send('This i a random page');
});

// 6. ERROR HANDLING (EXPRESS DEFAULT)
app.get('/err', (req, res) => {
  abcd = abcd;
});

app.use((err, req, res, next) => {
  console.log('------- ERROR -------');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('------- ERROR2 Middleware -------');
  next(err);
});

// 0. ERROR PAGE 404
//404
app.use((req, res) => {
  // res.send('Page not found');
  res.status(404).send('Page not found');
});

app.listen('8080', () => {
  console.log('Server listening to port 8080');
});

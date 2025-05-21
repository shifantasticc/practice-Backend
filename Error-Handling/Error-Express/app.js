const express = require('express');
const app = express();
const ExpressError = require('./ExpressError');

// 1. ERROR HANDLING (EXPRESS DEFAULT)
// app.get('/err', (req, res) => {
//   abcd = abcd;
// });

// app.use((err, req, res, next) => {
//   console.log('------- ERROR -------');
//   next(err);
// });

// app.use((err, req, res, next) => {
//   console.log('------- ERROR2 Middleware -------');
//   next(err);
// });

// 2. CUSTOM ERROR CLASSES
const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === 'giveaccess') {
    next();
  }
  throw new ExpressError(401, 'ACCESS DENIED!');
};

app.get('/api', checkToken, (req, res) => {
  res.send('data');
});

// 4. ACTIVITY
app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is forbidden")
})

// 3. DEFAULT STATUS AND MESSAGE
app.use((err, req, res, next) => {
  let {status=500, message="Some Error Occurred"} = err; // if the status and message is not there the above default will execute.
  res.status(status).send(message);
});

// 0. Custom Error handling
// app.use((err, req, res, next) => {
//   console.log('------------ ERROR ------------');
//   res.send(err);
// });

// 0. ERROR PAGE 404
// app.use((req, res) => {
//   // res.send('Page not found');
//   res.status(404).send('Page not found');
// });

app.listen('8080', () => {
  console.log('Server listening to port 8080');
});

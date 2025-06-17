const express = require('express');
const app = express();
const mongoose = require('mongoose');
// Setting up views Folder for EJS
const path = require('path');
// Importing chat.js
const Chat = require('./models/chat.js');
// To use PUT and PATCH request
const methodOverride = require('method-override');
const ExpressError = require('./ExpressError');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Connecting CSS file
app.use(express.static(path.join(__dirname, 'public')));
// To parse data from req.body in CREATE Route
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// CREATING CONNECTION
main()
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}

// Index Route
app.get(
  '/chats',
  asyncWrap(async (req, res) => {
    let chats = await Chat.find();
    res.render('index.ejs', { chats });
  }),
);

// New Route
app.get('/chats/new', (req, res) => {
  // throw new ExpressError(404, 'Page not found');
  res.render('new.ejs');
});

// Create Route
app.post(
  '/chats',
  asyncWrap(async (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    });
    await newChat.save();
    res.redirect('/chats');
  }),
);

// WRAP ASYNC
function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

//NEW - Show Route
app.get(
  '/chats/:id',
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(404, 'chat not found'));
    }
    res.render('edit.ejs', { chat });
  }),
);

// Edit Route
app.get(
  '/chats/:id/edit',
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render('edit.ejs', { chat });
  }),
);

// Update Route
app.put(
  '/chats/:id',
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidators: true, new: true },
    );

    console.log(updatedChat);
    res.redirect('/chats');
  }),
);

// Destroy Route
app.delete(
  '/chats/:id',
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect('/chats');
  }),
);

// Basic Route
app.get('/', (req, res) => {
  res.send('root is working');
});

// Mongoose Validation Error Handling
const handleValidationErr = (err) => {
  console.log('This is a Validation error. Please follow rules');
  console.dir(err.message);
  return err;
};

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name === 'ValidationError') {
    err = handleValidationErr(err);
  }
  next(err);
});

// Custom Error Handling Middleware
app.use((err, req, res, next) => {
  let { status = 500, message = 'Some Error Occurred' } = err;
  res.status(status).send(message);
});

// localhost
app.listen(8080, () => {
  console.log('server is listening on port 8080');
});

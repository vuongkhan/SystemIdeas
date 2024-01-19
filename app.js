const express = require('express');
const app = express();
const usersRoute = require('./routes/user.route');
const ideasRoute = require('./routes/idea.route');
const tagsRoute = require('./routes/tag.route');
const commentsRoute = require('./routes/comment.route');
const authRoute = require('./routes/auth.route');
const emotionRoute = require('./routes/emotion.route');
const notificationRoute = require('./routes/notification.route');
const { conn } = require('./config/db');
const cors = require('cors');

// enable cors to allow access from other server
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Parse incoming JSON requests
app.use(express.json());

// Route middleware for users
app.use('/users', usersRoute);

// Route middleware for ideas
app.use('/ideas', ideasRoute);

// Route middleware for tags
app.use('/tags', tagsRoute);

app.use('/comments', commentsRoute);
app.use('/auth', authRoute);

app.use('/emotion', emotionRoute);
app.use('/notifications', notificationRoute);

// Start the server
conn.once('open', () => {
  app.listen(8080, () => {
    console.log('Server started on port 8080');
  });
});
  
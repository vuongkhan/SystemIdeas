const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://group1940:19401940@cluster0.txsa0qr.mongodb.net/IdeaSystem?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const conn = mongoose.connection;

conn.on('error', (error) => {
  console.error(error);
});

conn.once('open', () => {
  console.log('Connected to database');
});

module.exports = { conn };

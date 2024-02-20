const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vuongkhan:0962010052@cluster0.rsezw.mongodb.net/Idea?retryWrites=true&w=majority', {
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

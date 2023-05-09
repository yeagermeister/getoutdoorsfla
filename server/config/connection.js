const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect('http://localhost:27017');


module.exports = mongoose.connection;

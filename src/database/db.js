const mongoose = require('mongoose');
const uri = process.env.MONGO_DB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(() => console.log("Connected to Database"))
    .catch((e) => console.log(e.message));
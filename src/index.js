const express = require('express');
const app = express();
require('./database/db');

const port = process.env.PORT || 3001;
const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');
const cors = require('cors');
const passport = require('passport');

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(noteRoute);
app.use(passport.initialize());

require('./middleware/passport')(passport);

app.listen(port, () => {
    console.log(`Server started spinning on port ${port}`);
});
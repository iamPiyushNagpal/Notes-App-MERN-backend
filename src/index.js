const express = require('express');
const app = express();
require('./database/db');

const port = process.env.PORT || 3001;
const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(noteRoute);

app.listen(port, () => {
    console.log(`Server started spinning on port ${port}`);
});
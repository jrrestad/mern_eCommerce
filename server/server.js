require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');

// const myFirstSecret = process.env.FIRST_SECRET_KEY;

require('./config/mongoose.config')(process.env.DB_NAME);
app.use(cookieParser());
// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({extended: true}));

require('./routes/routes')(app);

app.listen(process.env.DB_PORT, () => {
    console.log(`Listening on port: ${process.env.DB_PORT}`)
});
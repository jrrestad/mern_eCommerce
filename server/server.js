require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');

//BELOW 11/05

//ABOVE

require('./config/mongoose.config')(process.env.DB_NAME);
app.use(cookieParser());
// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({extended: true}));

// ***********
// SET STORAGE
app.use('/uploads', express.static('uploads'));
// *************

require('./routes/routes')(app);

app.listen(process.env.DB_PORT, () => {
    console.log(`Listening on port: ${process.env.DB_PORT}`)
});
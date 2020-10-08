const mongoose = require('mongoose');

module.exports = DB_NAME => {

    mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then( () => console.log(`Established connection to ${DB_NAME}`))
    .catch( err => console.log("Something went wrong when connecting to the DB: ", err))
}
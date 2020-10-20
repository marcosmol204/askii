const mongoose = require('mongoose');

const app = require('./app');

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});

const configObj = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false,
};

mongoose.connect(process.env.DATABASE_DEV_URL, configObj)
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error));

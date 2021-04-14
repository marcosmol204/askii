const mongoose = require('mongoose');

module.exports = () => {
  const configObj = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
    useFindAndModify: false,
  };

  mongoose.connect(process.env.DEV_DB_URL, configObj);

  mongoose.connection.on('connected', () => {
    console.log('MongoDb is connected');
  });

  mongoose.connection.on('open', () => {
    console.log('MongoDb is ready');
  });

  mongoose.connection.on('error', (error) => {
    console.log(`MongoDb error: ${error.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDb is disconnected');
  });

  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  });
  process.on('exit', async () => {
    await mongoose.connection.close();
    // eslint-disable-next-line no-process-exit
  });
};

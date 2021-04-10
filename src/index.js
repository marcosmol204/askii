const app = require('./app');
require('../utils/connections/init-mongodb')();

const HTTPPort = process.env.PORT || 5000;

app.listen(HTTPPort, () => {
  console.log(`Listening: http://localhost:${HTTPPort}`);
});

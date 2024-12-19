const bodyParser = require('body-parser');
require('dotenv').config();
const express = require('express');


const AppInit =  () => {
  const app = express();
  app.use(bodyParser.json());

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
  });

  return app;
}

module.exports = AppInit;






const express = require('express')

const bodyParser = require('body-parser')

const app = express();

// receber e entender requisições em json
app.use(bodyParser.json());
// receber e entender parametros via url
app.use(bodyParser.urlencoded({ extended: 'false' }));


require('./app/controllers/index')(app);

app.listen(3000);
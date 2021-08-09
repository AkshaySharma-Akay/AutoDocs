const express = require('express');
const morgan = require('morgan');

const app = express()
const port = 3000;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());   
app.use(morgan('dev'));


const heathCheckRoute = require('./routes/healthCheckRoutes');
const generatePdfRoute = require('./routes/genPdfRoutes');

app.use('/healthy', heathCheckRoute);
app.use('/genpdf', generatePdfRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
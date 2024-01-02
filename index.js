const bodyParser = require('body-parser');
const express = require('expresss');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Servidor Roando na porta: ${port}`);
})

require("./conection")
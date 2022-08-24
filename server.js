const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
//console.log(process.env);
const port = 3000;
app.use(cors());
app.use(express.json());


app.use(require("./routes/records"));

//db connection
const dbo = require('./db/conn');

app.listen(port, 'localhost', () => {
    // FOR DB Setup using MongoDB Atlas
    dbo.connectToServer(function (err) {
        if (err) { console.error(err); }
    });
    console.log(`Server is running on port ${port}`);
});
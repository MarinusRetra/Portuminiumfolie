const cors = require('cors'); const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../swag.env') });
const {Sequelize, DataTypes, Model} = require('sequelize'); 
const express = require('express'); 
const mysql = require('mysql2'); 
const app = express(); 

app.use(express.static(path.join(__dirname, "public"))); // Als een aangevraagd bestand in de public map staan dan served het dat bestand.
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express server is running!');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
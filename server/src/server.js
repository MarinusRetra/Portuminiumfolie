const cors = require('cors'); 
const path = require('path'); // Misschien niet nodig.
require('dotenv').config({ path: path.resolve(__dirname, '../../swag.env') }); //Gebruikt dotenv om key value pairs aan process.env toe te voegen vanuit swag.env
const {Sequelize, DataTypes, Model} = require('sequelize'); //Definitions voor ORM
const express = require('express');
const mysql = require('mysql2'); 
const app = express(); 

class Project extends Model {}

//Middleware voor static static files.
app.use(express.static(path.join(__dirname, "public"))); // Als een aangevraagd bestand in de public map staat dan geeft het dat bestand.
app.use(cors());
app.use(express.json());

//Setup database verbinding met ORM. sequelize is de instance van de database verbinding.
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

async function StartServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(process.env.PORT, () => { console.log(`Server listening`); });
  } 
  catch (error) {
    console.error('Unable to connect', error);
  }
}

StartServer();

app.get('/', (req, res) => { // Als een request binnenkomt op de root stuur "server is running!" terug
  res.send('Swag'); //The coolest get request in town.
});






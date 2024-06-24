const express = require("express");
var path = require('path');
const app = express();
const port = 3000;
const sequelize = require('./database/database');
const User = require('./models/User');

app.use(express.static(path.join(__dirname + '/public')))
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Conexion y sync con base de datos
async function connectionDB() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Model Sync
async function syncDB() {
    console.log('Sincronizando DB');
    await sequelize.sync({ force: true }) 
    console.log("Todos los modelos se han sincronizado");
}

app.get('/', (req,res) => {
    res.send("Hello World!")   
});


//PARA CONECTAR EN LOCAL
//192.168.1.140:3000
//Adaptador de LAN inalámbrica Wi-Fi: Dirección IPv4
app.listen(port, () => {
    connectionDB();
    syncDB();
    console.log(`Escuchando puerto ${port}`)
})
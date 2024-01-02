const mongose = require('mongose');

const dbUser = process.env.DB_USER

const dbPassword = process.env.DB_PASS


const conect = () => {
    mongose.conection(``)

    const connection = monsgose.connection

    connection.on("error", () => {
        console.log("Error ao conectar com MongoDB")
    })

    connection.on("open", () => {
        console.log("Connectado com o MongoDB ")
    })
}

conect()

conect.exports = mongose
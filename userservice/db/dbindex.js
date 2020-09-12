const Sequelize = require('sequelize')
const {user} = require('./usermodel')


const db = new Sequelize({
    dialect:'mysql',
   username:'root',
   database:'KubernetesAssignment',
   password:process.env.DB_PASSWORD ||'root',
   host: process.env.DB_URL ||'35.194.14.138',
   port:3306
})

/* User Model */
const User = db.define('user',user)

module.exports = {
    db,
   User
  }
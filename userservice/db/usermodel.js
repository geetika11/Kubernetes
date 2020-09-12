const Sequelize = require('sequelize')
const DT = Sequelize.DataTypes

module.exports = {
    user:{
        id: 
        {
            type: DT.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        age: 
        {
            type: DT.INTEGER(15)
        },
        name:
        {
            type:DT.STRING(50)    
        },
        email:
        {
            type:DT.STRING(150)
        }
    }
}
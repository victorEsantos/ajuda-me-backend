import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres://postgres:pac123@localhost:5432/mydb')

sequelize.authenticate().then(() => {
    console.log("db ok")
}).catch(e => {
    console.log("db error: ", e)
})
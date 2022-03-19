import express from "express"
import indexRoute from './routers/index'
import produtoRouter from './routers/produtoRoute'
import usuarioRouter from './routers/usuarioRoute'
import enderecoRouter from './routers/enderecoRoute'
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres://postgres:pac123@localhost:5432/mydb')

sequelize.authenticate().then(() => {
    console.log("db ok")
}).catch(e => {
    console.log("db error: ", e)
})

const app = express()

app.listen(3333, () => {
    console.log('Server running')
})


app.use("/", indexRoute)
app.use("/produtos", produtoRouter)
app.use("/usuarios", usuarioRouter)
app.use("/enderecos", enderecoRouter)

export default app
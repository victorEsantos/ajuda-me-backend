import express from "express"
import indexRoute from './routers/index'
import produtoRouter from './routers/produtoRoute'
import usuarioRouter from './routers/usuarioRoute'
import enderecoRouter from './routers/enderecoRoute'
import { Sequelize } from "sequelize"
import cors from "cors"


const sequelize = new Sequelize('postgres://postgres:pac123@localhost:5432/mydb')

sequelize.authenticate().then(() => {
    console.log("db ok")
}).catch(e => {
    console.log("db error: ", e)
})

const app = express()
const port = 3333;

app.use(cors());


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.listen(port, () => {
    console.log('Server running on port: ' + port)
})


app.use("/", indexRoute)
app.use("/produtos", produtoRouter)
app.use("/usuarios", usuarioRouter)
app.use("/enderecos", enderecoRouter)

export default app
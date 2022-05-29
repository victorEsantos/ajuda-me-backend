import express from "express"
import indexRoute from './routers/index'
import produtoRouter from './routers/produtoRoute'
import usuarioRouter from './routers/usuarioRoute'
import enderecoRouter from './routers/enderecoRoute'
import { Sequelize } from "sequelize"
import cors from "cors"

const Papel = require("../models").Papel
const sequelize = new Sequelize('postgres://postgres:pac123@localhost:5432/mydb')


sequelize.sync().then(() => {
    console.log('Resync Db');
    initial();
  });

sequelize.authenticate().then(() => {
    console.log("db ok")
}).catch(e => {
    console.log("db error: ", e)
})

async function initial() {

    try{
        await Papel.create({
            id: 1,
            nome: "user",
            descricao: "usuario comum"
          });
         
          await Papel.create({
            id: 2,
            nome: "moderator",
            descricao: "usuario moderador"
          });
         
          await Papel.create({
            id: 3,
            nome: "admin",
            descricao: "usuario administrador"
          });

    }catch(e){
        console.log("\n \n Não foi possivel criar papeis, pois já foram criados \n\n")
    }
    
}

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
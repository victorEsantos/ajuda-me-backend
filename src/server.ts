import express, { request, Request, Response } from "express";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgres://postgres:pac123@localhost:5432/mydb')

const Produto = require("../models").Produto

sequelize.authenticate().then(() => {
    console.log("db ok")
}).catch(e => {
    console.log("db error: ", e)
})

const app = express()

// app.get('/', async (req: Request, res: Response) => {
//     const produto = await Produto.create({ nome: 'Café', quantidade: 10 })

//     res.send("Produto Criado: " + produto.id)

// })

app.get('/produtos', async (req: Request, res: Response) => {
    const produtos = await Produto.findAll({
        order: [['nome', 'ASC']]
    })

    res.json({ produtos })

})

app.post('/produtos', async (req: Request, res: Response) => {
    const produto = req.body

    if (produto && produto.nome) {
        const p = await Produto.create({ nome: produto.nome, quantidade: produto.quantidade ?? 0 })
        res.json(p.id)

    } else {
        res.status(400).json({ mensagem: 'Produto inválido' })
    }
})

app.put('/produtos', async (req: Request, res: Response) => {
    const producto = req.body

    try {
        await Produto.update({ quantidade: producto.quantidade }, {
            where: {
                id: producto.id
            }
        })
    } catch (e) {
        res.status(500).json({ mensagem: 'Erro inesperado ao atualizar produto: ', e })
    }


})


app.listen(3333, () => {
    console.log('Server running')
})
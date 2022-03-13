import {Request, Response } from "express";

const Produto = require("../../models").Produto

const get = async (req: Request, res: Response) => {

    const produtos = await Produto.findAll({
        order: [['nome', 'ASC']]
    })

    res.json({ produtos })

}

const post = async (req: Request, res: Response) => {

    const produto = req.body

    if (produto && produto.nome) {
        const p = await Produto.create({ nome: produto.nome, quantidade: produto.quantidade ?? 0 })
        res.json(p.id)

    } else {
        res.status(400).json({ mensagem: 'Produto inválido' })
    }

}

const put = async (req: Request, res: Response) => {

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

}



export default {get, post, put}
import {Request, Response } from "express";

const Usuario = require("../../models").Usuario
const Endereco = require("../../models").Endereco

const get = async (req: Request, res: Response) => {

    const Usuarios = await Usuario.findAll({
        order: [['nome', 'ASC']]
    })

    res.json({ Usuarios })

}

const getById = async (req: Request, res: Response) => {

    const usuario = await Usuario.findByPk(req.params.id, {
        include:[{
            model: Endereco,
            attributes: ['cidade', 'rua', 'numero']

        }]
    })

    res.json({ usuario })

}

const post = async (req: Request, res: Response) => {

    const Usuario = req.body

    if (Usuario && Usuario.nome) {
        const p = await Usuario.create({ nome: Usuario.nome, quantidade: Usuario.quantidade ?? 0 })
        res.json(p.id)

    } else {
        res.status(400).json({ mensagem: 'Usuario inválido' })
    }

}

const put = async (req: Request, res: Response) => {

    const producto = req.body

    try {
        await Usuario.update({ quantidade: producto.quantidade }, {
            where: {
                id: producto.id
            }
        })
    } catch (e) {
        res.status(500).json({ mensagem: 'Erro inesperado ao atualizar Usuario: ', e })
    }

}



export default {get, getById, post, put}
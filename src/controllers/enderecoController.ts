import { Request, Response } from "express";

const Endereco = require("../../models").Endereco

const get = async (req: Request, res: Response) => {

    const enderecos = await Endereco.findAll()

    res.json({ enderecos })

}

const getById = async (req: Request, res: Response) => {

    const usuario = await Endereco.findByPk(req.params.id, {
        include: [{
            model: Endereco,
            attributes: ['cidade', 'rua', 'numero']

        }]
    })

    res.json({ usuario })

}

const post = async (req: Request, res: Response) => {

    const endereco = req.body

    if (endereco) {
        const p = await Endereco.create({ estado: endereco.estado, cidade: endereco.cidade, rua: endereco.rua, numero: endereco.numero, cep: endereco.cep })
        res.json(p.id)

    } else {
        res.status(400).json({ mensagem: 'Endereço inválido' })
    }

}

const put = async (req: Request, res: Response) => {

    const endereco = req.body

    try {
        await Endereco.update({ estado: endereco.estado, cidade: endereco.cidade, rua: endereco.rua, numero: endereco.numero, cep: endereco.cep }, {
            where: {
                id: endereco.id
            }
        })
    } catch (e) {
        res.status(500).json({ mensagem: 'Erro inesperado ao atualizar Usuario: ', e })
    }

}



export default { get, getById, post, put }
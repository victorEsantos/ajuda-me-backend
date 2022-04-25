import { Request, Response } from "express";

const Usuario = require("../../models").Usuario
const Endereco = require("../../models").Endereco

const get = async (req: Request, res: Response) => {

    const Usuarios = await Usuario.findAll({
        order: [['id', 'ASC']]
        // limit: 1,
        // offset: 1

    })

    res.json(Usuarios)

}

const getById = async (req: Request, res: Response) => {

    const usuario = await Usuario.findByPk(req.params.id, {
        include: [{
            model: Endereco,
            attributes: ['cidade', 'rua', 'numero', 'estado', 'cep']

        }]
    })

    res.json(usuario)

}

const postRegister = async (req: Request, res: Response) => {

    const usuario = req.body;
    console.log("agora aqui")
    console.log(req.body);

    if (usuario && usuario.nome) {
        const p = await Usuario.create(
            {
                nome: usuario.nome,
                email: usuario.email,
                user: usuario.user,
                senha: usuario.senha
            })
        res.json(p.id)

    } else {
        res.status(400).json({ mensagem: 'Usuario inválido' })
    }

}

const put = async (req: Request, res: Response) => {

    const usuario = req.body;
    const id = req.params.id;

    try {
        await Usuario.update(usuario, {
            where: {
                id: id
            }
        })

        res.json("ok")
    } catch (e) {
        res.status(500).json({ mensagem: 'Erro inesperado ao atualizar Usuario: ', e })
    }

}



export default { get, getById, postRegister, put }
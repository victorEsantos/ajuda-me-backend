import { Request, Response } from "express";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const config = require("../../config/auth.config");
const Usuario = require("../../models").Usuario
const Papel = require("../../models").Papel
const Endereco = require("../../models").Endereco
const db = require("../../models");
const Op = db.Sequelize.Op;

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

const signin = async (req: Request, res: Response) => {
    
    Usuario.findOne({
      where: {
        user: req.body.username
      }
    })
      .then((user: any) => {

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        console.log("senha usuario req: ", req.body.password)
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.senha
        );

        console.log("senha é valida: ",passwordIsValid)
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        var authorities: string[] = [];
        console.log('1')

        console.log(user.getRoles())
        user.getRoles().then((roles:any) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
          });
        });
      })
      .catch((err: { message: any; }) => {
        res.status(500).send({ message: err.message });
      });
  };

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
                senha: bcrypt.hashSync(usuario.senha, 8)
            }).then((user: any) => {
                if (req.body.roles) {
                  Papel.findAll({
                    where: {
                      name: {
                        [Op.or]: req.body.roles
                      }
                    }
                  }).then((roles: any) => {
                    user.setRoles(roles).then(() => {
                      res.send({ message: "User was registered successfully!" });
                    });
                  });
                } else {
                  // user role = 1
                  user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                  });
                }
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



export default { get, getById, postRegister, put, signin }
import { Request, Response } from "express";
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const config = require("../../config/auth.config");
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

        }],
        attributes: {exclude: ['senha']},
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
          expiresIn: 8641800000 // 5 hours
        });

        var authorities: string[] = [];
        console.log('1')

        console.log("haha==>>", user)
        console.log(user.getRoles())
        user.getRoles().then((roles:any) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].nome.toUpperCase());
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
    console.log(usuario);

    if (usuario && usuario.nome) {
        await Usuario.create(
            {
                nome: usuario.nome,
                email: usuario.email,
                user: usuario.user,
                senha: bcrypt.hashSync(usuario.senha, 8)
            }).then((user: any) => {
                
                
                  // user role = 1
                  user.setRoles([1]).then(() => {
                    res.json({ message: "User was registered successfully! default" });
                  });

              })


    } else {
        res.status(400).json({ mensagem: 'Usuario inválido' })
    }

}

const put = async (req: Request, res: Response) => {

    const usuario = req.body;
    const id = req.params.id;

    if(usuario.senha){
      usuario.senha = bcrypt.hashSync(usuario.senha, 8)
    }

    try {
        console.log("atualizarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        console.log(usuario)
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
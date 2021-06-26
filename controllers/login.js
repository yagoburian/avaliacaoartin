const express = require("express")

const route = express.Router()

const Usuario = require("../models/usuarios")
const Produto = require("../models/produtos")

const jwt = require("jsonwebtoken")
require("dotenv/config")

route.post("/login", async (req, res) => {
    const { usuario, senha } = req.body

    Usuario.findOne({ usuario: usuario }, async (err, data) => {
        if (data) {
            if (senha === data.senha) {
                const token = await jwt.sign({
                    userId: data._id,
                    userNome: data.nome
                }, process.env.CHAVE_SEGUR, { expiresIn: 86400 } );
                return res.send(
              {
                        token,
                        nome: data.nome
                    }
                )
            } else {
                return res.send("Senha incorreta.");
            }
        } else {
            return res.send("Usuário não econtrado.");
        }
    })
})

route.get("/lista/produtos", async (req, res) => {
    const lista = await Produto.find({ ativo: true })
    return res.send(lista)
})

module.exports = app => app.use("", route)

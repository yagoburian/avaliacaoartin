const express = require("express")
const Produto = require("../models/produtos")

const route = express.Router()

route.post("/produtos", async (req, res) => {
    await Produto.create(req.body, (err, ret) => {
        if (err)
            return res.send(err.message)
        return res.send(ret)
    })
})


route.put("/produtos", async (req, res) => {
    const { _id,  preco,nome,imagem,descricao, quantidade,  ativo } = req.body
    var dados = await Produto.findOne({ _id: _id })
    if (dados == null) {
        res.send("Produto não encontrado")
        return false
    }
        var mudanca = 'Parabens! Produto foi alterado com sucesso alterado com sucesso! \n';
    if(preco != dados.preco){
        mudanca += 'Preço alterado! (De "'+dados.preco+'" para "'+preco+' ")\n';
    }
    if(nome != dados.nome){
        mudanca += 'Nome alterado!(De "'+dados.nome+'" para "'+nome+' ")\n';
    }
    if(imagem != dados.imagem){
        mudanca += 'Imagem alterada!(De "'+dados.imagem+'" para "'+imagem+' ")\n';
    }
    if(descricao != dados.descricao){
        mudanca += 'Descrição alterado!(De "'+dados.descricao+'" para "'+descricao+' ")\n';
    }
    if(quantidade != dados.quantidade){
        mudanca += 'Quantidade alterado!(De "'+dados.quantidade+'" para "'+quantidade+' ")\n';
    }
    var retorno = await Produto.updateOne({ _id: _id }, { $set: { nome: nome, preco: preco, imagem: imagem, descricao: descricao, quantidade: quantidade }})
    res.send(mudanca)
})

route.delete("/produtos", async (req, res) => {
    const { _id } = req.body
    var dados = await Produto.findOne({ _id: _id })
    if (dados == null) {
        res.send("Produto não encontrado")
        return false
    }
    var mudanca = "O produto "+dados.nome+" foi apagado!";
    var retorno = await Produto.updateOne({ _id: _id }, { $set: { ativo: false }})
    res.send(mudanca);
})

module.exports = app => app.use("/admin", route)
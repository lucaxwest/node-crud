const express = require('express')
const server = express()

server.use(express.json())



function encontrarVeiculo(placa) {
    return baseDeAutomoveis.filter(v => v.placa == placa)[0]
}

const baseDeAutomoveis = [{
    placa: 'mev-123',
    modelo: 'modelo',
    marca: 'vw',
    ano: 2022
}]

server.get('/veiculo', (req, res)=> {
    baseDeAutomoveis.push(req)
    return res.json()
})

server.get('/veiculo/:placa', (req, res)=> {
    const { placa } = req.params
    const veiculo = encontrarVeiculo(placa)
    if(veiculo) {
        return res.json(veiculo)
    } else {
            return res.status(500).json("Veículo não foi encontrado")
    }
})

server.post('/veiculo', (req, res)=>{
    const veiculo = req.body

    const veiculoBase = encontrarVeiculo(placa)
    if(veiculoBase) {
        return res.status(500).json("Veículo não encontrado")
    } else {
        baseDeAutomoveis.push(veiculo)
        return res.json(baseDeAutomoveis)
    }
})

server.put('/veiculo/:placa', (req, res)=>{
    const { placa } = req.params
    const { modelo, marca } = req.body

    const veiculo = encontrarVeiculo(placa)
    if(veiculo) {
        veiculo.marca = marca
        veiculo.modelo = modelo
        return res.json(veiculo)
    } else {
            return res.status(500).json("Veículo não encontrado")
    }
})


server.delete('/veiculo/:placa', (req, res)=>{
    const { placa } = req.params

    baseDeAutomoveis.forEach((v,index)=>{
        if (v.placa == placa) {
            baseDeAutomoveis.slice(index, 1)
            return res.json(v)
        }
    })
    return res.status(500).json("Veiculo não encontrado")
})



server.listen(3333, ()=>{
    console.log('Server ON')
})

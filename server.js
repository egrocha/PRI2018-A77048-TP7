var express = require('express')
var http = require('http')
var logger = require('morgan')
var pug = require('pug')
var fs = require('fs')
var formidable = require('formidable')
var jsonfile = require('jsonfile')

var myDB = 'db.json'
var app = express()

app.use(logger('combined'))

app.use((req, res, next) => {
    if(!(req.url.indexOf('uploaded')) && req.url != '/w3.css'){
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
    }
    next()
})

app.get('/', (req, res) => {
    res.write(pug.renderFile('pugs/form-ficheiro.pug'))
    res.end()
})

app.get('/ficheiros', (req, res) => {
    jsonfile.readFile(myDB, (erro, dados) => {
        if(!erro)
            res.write(pug.renderFile('pugs/ficheiros.pug', {lista: dados}))
        else
            res.write(pug.renderFile('pugs/erro.pug', {e: erro}))
        res.end()
    })
})

app.get('/uploaded/:fileName', (req, res) => {
    var fileName = req.params.fileName
    res.sendFile(__dirname+'/uploaded/'+fileName, erro => {
        if(erro)
            res.write(pug.renderFile('pugs/erro.pug', {e: erro}))
        res.end()
    })
})

app.get('/w3.css', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/css'})
        fs.readFile('stylesheets/w3.css', (erro, dados) => {
            if(!erro){
                res.write(dados)
            }
            else{
                res.write(pug.renderFile('pugs/erro.pug', {e: erro}))
            }
            res.end()
        })
})

app.post('/processaForm', (req, res) => {
    var form = new formidable.IncomingForm()
        form.parse(req, (erro, fields, files) => {

            var fenviado = files.ficheiro.path
            var fnovo = './uploaded/'+files.ficheiro.name

            fs.rename(fenviado, fnovo, erro => {
                if(!erro){
                    jsonfile.readFile(myDB, (erroRead, ficheiros) => {
                        if(!erroRead){
                            var fich = '{"nome": "'+files.ficheiro.name+'", "desc": "'+fields.desc+'"}'
                            ficheiros.push(JSON.parse(fich))
                            jsonfile.writeFile(myDB, ficheiros, erroWrite => {
                                if(!erroWrite)
                                    console.log('Registo gravado com successo')
                                else
                                    console.log('Erro: ' + erroWrite)
                            })
                        }
                        else{
                            console.log('Erro: ' + erroRead)
                        }
                    })
                    res.write(pug.renderFile('pugs/ficheiro-recebido.pug', 
                        {ficheiro: files.ficheiro.name, 
                        status: "Ficheiro recebido e guardado com sucesso."}))
                    res.end()
                }
                else{
                    res.write(pug.renderFile('pugs/erro.pug', 
                        {e: "Ocorreram erros na gravação do ficheiro enviado "+erro}))
                    res.end()
                }
            })
        })
})

http.createServer(app).listen(4007, () => {
    console.log('Servidor à escuta na porta 4007...')
})
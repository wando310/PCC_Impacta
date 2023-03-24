//Constantes
// Back end register
const express = require('express')
const bodyParse = require('body-parser')
const app = express()

const cors = require('cors')
const mysql = require('mysql2')

app.use(cors());
app.use(express.json())
app.use(bodyParse.urlencoded({ extended: true }))


const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@Lucivando123',
    database: 'pcc_impacta',
})

//register User 
app.post("/register_user", (req, res) => {
    const { nome } = req.body
    const { email } = req.body
    const { telefone } = req.body
    const { senha } = req.body
    const { endereco } = req.body

    const SQL = 'INSERT INTO users (nome,email,telefone,senha,endereco) VALUES ("?","?","?","?","?")'
    db.query(SQL, [nome, email, telefone, senha, endereco], (err, result) => { console.log(err); })
})

//get user 
app.get("/get_user_/:id", (req, res) => {
    const { id } = req.params
    const SQL = `SELECT * FROM users WHERE id = ?`
    db.query(SQL, [id], (error, result) => {
        error && console.log(error);
        !error && res.send(result)
    })
})

//get user token 
app.get("/get_user_token", (req, res) => {    
    const SQL = 'SELECT * FROM users'
    db.query(SQL, (error, result) => {
        error && console.log(error);
        !error && res.send(result)
    })
})

//Update de user 
app.put("/update_user", (req, res) => {
    const { id } = req.body
    const { nome } = req.body
    const { email } = req.body
    const { telefone } = req.body
    const { senha } = req.body
    const { endereco } = req.body   

    const SQL = "UPDATE users SET nome=?, email=?, telefone=?, senha=?, endereco=? WHERE id = ?"

    db.query(SQL, [nome, email, telefone, senha, endereco, id], (err, result) => {
        if (err) console.log(err);
        else res.send(result)
    })
})

//server port
app.listen(3000, () => {
    console.log('rodando servidor porta:3000');
})

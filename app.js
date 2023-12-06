const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT = 1907;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'petshop'
});

app.use(bodyParser.json());

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

// roteador de tutores
const tutorRouter = express.Router();

// Obter todos os tutores
tutorRouter.get('/', (req, res) => {
    connection.query('SELECT * FROM tutores', (err, results) => {
        if (err) {
            console.error('Erro ao consultar tutores:', err);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        } else {
            res.json(results);
        }
    });
});

// criar um novo tutor
tutorRouter.post('/', (req, res) => {
    const novoTutor = req.body;

    connection.query('INSERT INTO tutores SET ?', novoTutor, (err, result) => {
        if (err) {
            console.error('Erro ao inserir tutor:', err);
            res.status(500).json({ message: 'Erro interno do servidor.' });
        } else {
            res.status(201).json({ message: 'Tutor criado com sucesso.', id: result.insertId });
        }
    });
});

// Registrar o roteador de tutores
app.use('/tutores', tutorRouter);

process.on('SIGINT', () => {
    connection.end();
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


const Tutor = require('./Tutor');
const authenticateToken = require('./authMiddleware');

let tutores = [];

module.exports = {
    getAllTutors(req, res) {
        res.json(tutores);
    },

    getTutorByCPF: authenticateToken, 
    createTutor: authenticateToken,
    updateTutor: authenticateToken,
    deleteTutor: authenticateToken,
    addPetToTutor: authenticateToken,

    getTutorByCPF(req, res) {
        const cpf = req.params.cpf;
        const tutor = tutores.find(t => t.cpf === cpf);

        if (tutor) {
            res.json(tutor);
        } else {
            res.status(404).json({ message: 'Tutor não encontrado.' });
        }
    },

    createTutor(req, res) {
        const newTutor = req.body;
        tutores.push(new Tutor(newTutor.cpf, newTutor.nome, newTutor.email));
        res.status(201).json({ message: 'Tutor criado com sucesso.' });
    },

    updateTutor(req, res) {
        const cpf = req.params.cpf;
        const updatedTutor = req.body;
        const index = tutores.findIndex(t => t.cpf === cpf);

        if (index !== -1) {
            tutores[index] = new Tutor(updatedTutor.cpf, updatedTutor.nome, updatedTutor.email);
            res.json({ message: 'Tutor atualizado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Tutor não encontrado.' });
        }
    },

    deleteTutor(req, res) {
        const cpf = req.params.cpf;
        tutores = tutores.filter(t => t.cpf !== cpf);
        res.json({ message: 'Tutor excluído com sucesso.' });
    },

    addPetToTutor(req, res) {
        const cpf = req.params.cpf;
        const tutor = tutores.find(t => t.cpf === cpf);

        if (tutor) {
            const newPet = req.body;
            tutor.addPet(newPet.codigo_pet, newPet.nome_pet, newPet.genero_pet, newPet.altura_pet);
            res.status(201).json({ message: 'Pet adicionado com sucesso.' });
        } else {
            res.status(404).json({ message: 'Tutor não encontrado.' });
        }
    },

    
};

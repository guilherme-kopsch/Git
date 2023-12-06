class Tutor {
    constructor(cpf, nome, email) {
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.pets = []; //array de pets
    }

    addPet(codigo_pet, nome_pet, genero_pet, altura_pet) {
        const pet = { codigo_pet, nome_pet, genero_pet, altura_pet };
        this.pets.push(pet);
        this.updatePetHeightCategory(pet);
    }

    updatePetHeightCategory(pet) {
        if (pet.altura_pet <= 15) {
            pet.altura_categoria = 'pequeno';
        } else if (pet.altura_pet > 15 && pet.altura_pet < 45) {
            pet.altura_categoria = 'médio';
        } else {
            pet.altura_categoria = 'alto';
        }
    }
}

module.exports = Tutor;

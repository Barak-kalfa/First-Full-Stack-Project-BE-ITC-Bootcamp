const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");
const { all } = require("../../routes/petsRouts");

const pathToPetsDB = path.resolve(__dirname, "../../DB/pets.json");

async function readAllPets() {
     try {
          const petsList = await fs.readFileSync(pathToPetsDB);
          return JSON.parse(petsList);
     } catch (err) {
          console.log(err);
     }
}
async function UpdateAllPets(newPetsList){
     try {
          await fs.writeFileSync(pathToPetsDB, JSON.stringify(newPetsList));
     } catch (err) {
          console.log(err);
     }
}

async function addPet(newPet){
    try {
      const allPets = await readAllPets()

     allPets.push(newPet)
     fs.writeFileSync(pathToPetsDB, JSON.stringify(allPets))
     return true
    } catch(err){
     console.log(err);
    }
}


async function fosterPet(petId, userId){
     const allPets = await readAllPets()
       allPets.forEach((pet) => {
          if (petId === pet.id) {
               pet.fosterId = userId;
                pet.adoptionStatus = "Fosterd";
          }
     })
     UpdateAllPets(allPets)
     return true
}

async function adoptPet(petId, userId) {
     const allPets = await readAllPets();
     allPets.forEach((pet) => {
          if (petId === pet.id) {
               pet.ownerId = userId;
               pet.fosterId = ""
               pet.adoptionStatus = "Adopted";
          }
     });
     UpdateAllPets(allPets);
     return true;
}

async function returnPet(petId) {
     const allPets = await readAllPets();
     allPets.forEach((pet) => {
          if (petId === pet.id) {
               pet.ownerId = "";
               pet.adoptionStatus = "";
               pet.fosterId = ""
          }
     });
     UpdateAllPets(allPets);
     return true;
}


module.exports = { readAllPets, addPet, fosterPet, adoptPet, returnPet };
const fs = require("fs");
const path = require("path");
const { uuid } = require("uuidv4");

const pathToPetsDB = path.resolve(__dirname, "../../DB/pets.json");

function readAllPets() {
     try {
          const petsList = fs.readFileSync(pathToPetsDB);
          return JSON.parse(petsList);
     } catch (err) {
          console.log(err);
     }
}
function UpdateAllPets(newPetsList){
     try {
          fs.writeFileSync(pathToPetsDB, JSON.stringify(newPetsList));
     } catch (err) {
          console.log(err);
     }
}

function addPet(newPet){
    try {
      const allPets = readAllPets()
     allPets.push(newPet)
     fs.writeFileSync(pathToPetsDB, JSON.stringify(allPets))
     return true
    } catch(err){
     console.log(err);
    }
}


function fosterPet(petId, userId){
     const allPets = readAllPets()
       allPets.forEach((pet) => {
          if (petId === pet.id) {
               pet.fosterId = userId;
          }
     })
     UpdateAllPets(allPets);
    
//    return pet;
}

// function updatePets(){
//           const pets = readAllPets()
       
//      pets.map((pet) => {
//           pet = {
//                ...pet,
//                id: uuid(),
//               date: new Date(),
//           };
//           console.log(pet);
//      });
     
//      fs.writeFileSync(pathToPetsDB, JSON.stringify(pets))

// }


module.exports = { readAllPets, addPet, fosterPet };
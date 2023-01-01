const dbConnection = require("../knex/knex");
const axios = require("axios");

async function getAllPetsModel() {
   try {
      const petsList = await dbConnection.from("pets").limit(10);
      return petsList;
   } catch (err) {
      console.log(err);
   }
}

async function getPetsModel(searchInput, seachField) {
   // NEED TO ADD ADVANCED SEARCH
   try {
      const pets = await dbConnection
         .from("pets")
         .whereILike(seachField, `%${searchInput}%`);
      return pets;
   } catch (err) {
      console.log(err);
   }
}

async function getPetModel(petId) {
   try {
      const pet = await dbConnection.from("pets").where({ petId: petId });
      return pet;
   } catch (err) {
      console.log(err);
   }
}

async function addPetModel(newPet) {
   try {
      const dogPicUrl = await axios.get(
         "https://dog.ceo/api/breeds/image/random"
      );
      // newPet.picture = dogPicUrl.data.message;
      const [id] = await dbConnection.from("pets").insert(newPet, "petId");
      return id.petId;
   } catch (err) {
      console.log(err);
   }
}

// async function savePetModel(petId, userId){
//    try{
//       await dbConnection.from('users').where({userId: userId}).update({})
//    }
// }

async function getPetByUserModel(userId) {
   try {
      const pets = await dbConnection
         .from("pets")
         .where({ ownerId: userId })
         .andWhere({ fosterId: userId });
      /*.andWhere({SAVED PET})*/
      return pets;
   } catch (err) {
      console.log(err);
   }
}

async function fosterPetModel(fosterPetId, userId) {
   try {
      await dbConnection
         .from("pets")
         .where({ petId: fosterPetId })
         .update({ fosterId: userId });
      return true;
   } catch (err) {
      console.log(err);
   }
}

async function adoptPetModel(adoptPetId, userId) {
   try {
      const response = await dbConnection
         .from("pets")
         .where({ petId: adoptPetId })
         .update({ ownerId: userId });
      return response;
   } catch (err) {
      console.log(err);
   }
}

async function returnPetModel(returnPetId) {
   try {
      const response = await dbConnection
         .from("pets")
         .where({ petId: returnPetId })
         .update({ ownerId: null, adoptionStatus: null, fosterId: null });
      return response;
   } catch (err) {
      console.log(err);
   }
}

async function editPetModel(petInfo) {
   try {
      const response = await dbConnection
         .from("pets")
         .where({ petId: petInfo.petId })
         .update({
            type: petInfo.type,
            name: petInfo.name,
            adoptionStatus: petInfo.adoptionStatus,
            picture: petInfo.picture,
            breed: petInfo.breed,
            bio: petInfo.bio,
            height: petInfo.height,
            weight: petInfo.weight,
            color: petInfo.color,
            hypoallerganic: petInfo.hypoallerganic,
            dietary: petInfo.dietary,
         });
      return response;
   } catch (err) {
      console.log(err);
   }
}

async function deletePetModel(deletPetId) {
   try {
      const deleted = await dbConnection
         .from("pets")
         .where({ petId: deletPetId })
         .del();
      return deleted;
   } catch (err) {
      console.log(err);
   }
}

module.exports = {
   getAllPetsModel,
   addPetModel,
   fosterPetModel,
   adoptPetModel,
   returnPetModel,
   editPetModel,
   deletePetModel,
   getPetModel,
   getPetsModel,
   getPetByUserModel,
};

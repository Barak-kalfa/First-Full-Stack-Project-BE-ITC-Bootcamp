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

async function searchPetsModel(searchText, searchFields) {
   const { type, name, height, weight, adoptionStatus } = searchFields;
   if (height || weight) {
      const float = Number(searchText);
   }
   try {
      const pets = await dbConnection.from("pets").where((qb) => {
         if (type) qb.whereILike("type", type);
         if (adoptionStatus) qb.whereILike("adoptionStatus", adoptionStatus);
         if (name) qb.whereILike("name", `%${searchText}%`);
         if (height)
            qb.whereBetween("height", [
               Math.round(Number(searchText) - (Number(searchText) / 100) * 30),
               Math.round(Number(searchText) + (Number(searchText) / 100) * 30),
            ]);
         if (weight)
            qb.whereBetween("weight", [
               Math.round(Number(searchText) - (Number(searchText) / 100) * 30),
               Math.round(Number(searchText) + (Number(searchText) / 100) * 30),
            ]);
      });
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
      const [id] = await dbConnection.from("pets").insert(newPet, "petId");
      return id.petId;
   } catch (err) {
      console.log(err);
   }
}

async function savePetModel(petId, userId) {
   try {
      const response = await dbConnection
         .insert([{ userId: userId, petId: petId }])
         .into("wish");
      return response;
   } catch (err) {
      console.log(err);
   }
}

async function deleteSavedPetModel(petId, userId) {
   try {
      const response = await dbConnection
         .from("wish")
         .where("userId", userId)
         .andWhere("petId", petId)
         .del();
      return response;
   } catch (err) {
      console.log(err);
   }
}

async function getPetsByUserModel(userId) {
   try {
      const pets = await dbConnection
         .from("pets")
         .where({ ownerId: userId })
         .orWhere({ fosterId: userId });
      const savedPets = await dbConnection
         .from("wish")
         .where({ userId: userId });
      return { pets, savedPets };
   } catch (err) {
      console.log(err);
   }
}

async function fosterPetModel(fosterPetId, userId) {
   try {
      const response = await dbConnection
         .from("pets")
         .where({ petId: fosterPetId })
         .update({ fosterId: userId, adoptionStatus: "Fostered" });
      return response;
   } catch (err) {
      console.log(err);
   }
}

async function adoptPetModel(adoptPetId, userId) {
   try {
      const response = await dbConnection
         .from("pets")
         .where({ petId: adoptPetId })
         .update({ ownerId: userId, adoptionStatus: "Adopted" });
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
         .update({ ownerId: null, adoptionStatus: "Availble", fosterId: null });
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

async function deletePetModel(deletePetId) {
   try {
      const deleted = await dbConnection
         .from("pets")
         .where({ petId: deletePetId })
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
   searchPetsModel,
   getPetsByUserModel,
   savePetModel,
   deleteSavedPetModel,
};

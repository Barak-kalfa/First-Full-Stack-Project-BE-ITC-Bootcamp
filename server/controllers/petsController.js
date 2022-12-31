const {
   addPetModel,
   fosterPetModel,
   adoptPetModel,
   returnPetModel,
   editPetModel,
   deletePetModel,
   getPetModel,
   getPetsModel,
   getAllPetsModel,
} = require("../models/petsModels");

const addPet = async (req, res) => {
   //KNEX:
   try {
      const id = await addPetModel(req.body);
      const newPet = {
         ...req.body,
         petId: id,
      };

      res.send(newPet);
   } catch (err) {
      console.log(err);
      res.status(500).send(err);
   }
};

const getAllPets = async (req, res) => {
   //KNEX:
   try {
      const allPets = await getAllPetsModel();
      res.send(allPets);
   } catch (err) {
      console.log(err);
      res.status(500).send(err);
   }
};

const getPets = async (req, res) => {
   const { searchInput } = req.body[0];
   const { seachField } = req.body[0];
   try {
     const pets = await getPetsModel(searchInput, seachField);
     res.send(pets)
   } catch (err) {
      console.log(err);
   }
};

const getPet = async (req, res) => {
   const { petId } = req.params;
   try {
      const pet = await getPetModel(petId);
      res.send(pet);
   } catch (err) {
      console.log(err);
   }
};

const fosterPet = async (req, res) => {
   const petId = req.body[0].petId;
   const userId = req.body[0].userId;

   try {
      await fosterPetModel(petId, userId);
      res.send(true);
   } catch (err) {
      console.log(err);
   }
};

const adoptPet = async (req, res) => {
   const petId = req.body[0].petId;
   const userId = req.body[0].userId;
   try {
      await adoptPetModel(petId, userId);
      res.send(true);
   } catch (err) {
      console.log(err);
   }
};

const returnPet = async (req, res) => {
   const { petId } = req.body[0];
   try {
      await returnPetModel(petId);
      res.send(true);
   } catch (err) {
      console.log(err);
   }
};

const editPet = async (req, res) => {
   const petInfo = req.body[0];
   try {
      console.log(petInfo.petId);
      await editPetModel(petInfo);
      res.send(true);
   } catch (err) {
      console.log(err);
   }
};

const deletePet = async (req, res) => {
   const { petId } = req.params;
   const deleted = await deletePetModel(petId);
   console.log("Pet Number:", petId, "Was Deleted");
   if (deleted) {
      res.send({ ok: true, deletedId: petId });
   }
};

module.exports = {
   addPet,
   getAllPets,
   fosterPet,
   returnPet,
   editPet,
   adoptPet,
   deletePet,
   getPet,
   getPets,
};

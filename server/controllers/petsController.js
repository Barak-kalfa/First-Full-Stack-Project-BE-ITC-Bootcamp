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
   savePetModel,
   getPetsByUserModel,
} = require("../models/petsModels");

const addPet = async (req, res) => {
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
   try {
      const allPets = await getAllPetsModel();
      res.send(allPets);
   } catch (err) {
      console.log(err);
      res.status(500).send(err);
   }
};

const searchPets = async (req, res) => {
   const { searchInput, seachField } = req.body;
   try {
     const pets = await getPetsModel(searchInput, seachField);
     res.send(pets);
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

const getPetByUser = async(req,res)=>{
   const {userId} = req.params;
   try{
      const response = await getPetsByUserModel(userId)
      res.send(response)
   }catch(err){
      console.log(err);
   }
}

const savePet = async(req, res)=>{
   const {userId, petId}= req.body;
   try{
      const response = await savePetModel(petId, userId)
      console.log(response);
      res.send(response);
   }catch(err){
      console.log(err);
   }

}

const fosterPet = async (req, res) => {
   const petId = req.body.petId;
   const userId = req.body.userId;

   try {
      await fosterPetModel(petId, userId);
      res.send(true);
   } catch (err) {
      console.log(err);
   }
};

const adoptPet = async (req, res) => {
   const petId = req.body.petId;
   const userId = req.body.userId;
   try {
      await adoptPetModel(petId, userId);
      res.send(true);
   } catch (err) {
      console.log(err);
   }
};

const returnPet = async (req, res) => {
   const { petId } = req.body;
   try {
      await returnPetModel(petId);
      res.send(true);
   } catch (err) {
      console.log(err);
   }
};

const editPet = async (req, res) => {
   const petInfo = req.body;
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
   searchPets,
   getPetByUser,
   savePet,
};

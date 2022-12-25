const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const pathToPetsDB = path.resolve(__dirname, "../DB/pets.json");
const { uuid } = require("uuidv4");
const {
     addPet,
     readAllPets,
     updatePets,
     fosterPet,
     adoptPet,
     returnPet,
} = require("../modules/pets_modules/petsModules");

router.get("/", (req, res) => {
     const data = JSON.parse(fs.readFileSync(pathToPetsDB));
     res.send(JSON.stringify(data));
});

router.post("/", (req, res) => {
     try {
          const newPet = {
               ...req.body,
               id: uuid(),
               date: new Date(),
               ownerId: "",
               fosterId: "",
          };
          const listWithNewPet = addPet(newPet);
          if (listWithNewPet) {
               res.send(newPet);
          }
     } catch (err) {
          console.log(err);
          res.status(500).send(err);
     }
});

router.post("/foster", (req, res) => {
     const { petId, userId } = req.body;
     try {
          const response = fosterPet(petId, userId);
          res.send(response);
     } catch (err) {
          console.log(err);
     }

 
});

router.post("/adopt", (req, res) => {
     const { petId, userId } = req.body;
     try {
          const response = adoptPet(petId, userId);
          res.send(response);
     } catch (err) {
          console.log(err);
     }
});

router.post("/return", (req, res) => {
     const { petId } = req.body;
     try {
        console.log(petId);
          const response = returnPet(petId);
          res.send(response);
     } catch (err) {
          console.log(err);
     }
});

module.exports = router;

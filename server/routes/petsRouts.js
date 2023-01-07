const express = require("express");
const router = express.Router();
const PetsController = require("../controllers/petsController");
const { validateBody } = require("../middleware/validateBody");
const { petSchema } = require("../schemas/petSchemas");
const { validateToken, validateAdminToken } = require("../middleware/JWT");

router.post(
   "/",
  //  validateAdminToken,
  //  validateBody(petSchema),
   PetsController.addPet
);

router.get("/all",
 PetsController.getAllPets);

//NEEDS FIX FOR SEARCHING SEVRAL FIELDS:
router.get("/search", PetsController.searchPets);
///////////////////////////////////////

router.get("/:petId",
 PetsController.getPet);

router.get("/user/:userId",
 PetsController.getPetByUser);

router.post("/save",
//  validateToken,
  PetsController.savePet);

router.delete("/save",
//  validateToken,
  PetsController.deleteSavedPet);

router.post("/foster",
//  validateToken,
  /*validateBody(),*/
   PetsController.fosterPet);

router.post("/adopt",
//  validateToken,
  /*validateBody(),*/ 
  PetsController.adoptPet);

router.post("/:petId/return",
//  validateToken,
  /*validateBody(),*/
  PetsController.returnPet);

router.put("/edit",
 validateAdminToken,
  /*validateBody(petSchema),*/
   PetsController.editPet);

router.delete("/:petId",
 PetsController.deletePet);

module.exports = router;

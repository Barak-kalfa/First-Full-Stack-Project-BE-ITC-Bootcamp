const express = require("express");
const router = express.Router();
const PetsController = require('../controllers/petsController');
const { validateBody } = require("../middleware/validateBody");
const { petSchema } = require("../schemas/petSchemas");

router.post("/",validateBody(petSchema), PetsController.addPet);

router.get("/all", PetsController.getAllPets);

router.get('/search', PetsController.searchPets)

router.get("/:petId", PetsController.getPet);

router.get('/user/:userId', PetsController.getPetByUser)

router.post('/save', PetsController.savePet)

router.post("/foster", /*validateBody(),*/ PetsController.fosterPet);

router.post("/adopt", /*validateBody(),*/ PetsController.adoptPet);

router.post("/return", /*validateBody(),*/ PetsController.returnPet);

router.put("/edit", /*validateBody(petSchema),*/ PetsController.editPet);

router.delete("/:petId", PetsController.deletePet);

module.exports = router;

const express = require("express");
const router = express.Router();

const PetsController = require('../controllers/petsController');
const { validateBody } = require("../middleware/validateBody");
const { petSchema } = require("../schemas/petSchemas");

router.post("/", /*validateBody(petSchema),*/ PetsController.addPet);

router.get("/all", PetsController.getAllPets);

router.get('/', PetsController.getPets)

router.get("/:petId", PetsController.getPet);

router.post("/foster", /*validateBody(),*/ PetsController.fosterPet);

router.post("/adopt", /*validateBody(),*/ PetsController.adoptPet);

router.post("/return", /*validateBody(),*/ PetsController.returnPet);

router.put("/edit", /*validateBody(),*/ PetsController.editPet);

router.delete("/:petId", PetsController.deletePet);

module.exports = router;

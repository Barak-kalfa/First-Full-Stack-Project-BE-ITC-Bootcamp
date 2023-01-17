const Ajv = require("ajv");
const ajv = new Ajv();

function fixDataTypes(req, res, next) {
   req.body.hypoallerganic = Boolean(req.body.hypoallerganic);
   req.body.height = Number(req.body.height);
   req.body.weight = Number(req.body.weight);
   req.body.petId = Number(req.body.petId);
   if (req.body.fosterId > 0) {
      req.body.fosterId = Number(req.body.fosterId);
   } else {
      req.body.fosterId = 0;
   }
   if (req.body.ownerId > 0) {
      req.body.ownerId = Number(req.body.ownerId);
   } else {
      req.body.ownerId = 0;
   }
   next();
}

function validateBody(schema) {
   return (req, res, next) => {
      const valid = ajv.validate(schema, req.body);
      if (!valid) {
         console.log(ajv.errors);
         res.status(400).send({ error: "Unable To Create Pet" });
      } else {
         next();
      }
   };
}

module.exports = { validateBody, fixDataTypes };

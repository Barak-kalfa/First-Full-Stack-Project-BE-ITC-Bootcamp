const Ajv = require("ajv");
const ajv = new Ajv();

function fixDataTypes(req, res, next) {
   req.body.hypoallerganic = Boolean(req.body.hypoallerganic);  
   req.body.height = Number(req.body.height);
   req.body.weight = Number(req.body.weight);
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

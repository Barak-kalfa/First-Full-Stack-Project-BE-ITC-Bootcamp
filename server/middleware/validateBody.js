const Ajv = require('ajv');
const ajv = new Ajv();



function validateBody(schema){
     return (req, res, next) =>{
          const valid = ajv.validate(schema, req.body)
          if (!valid) {
               console.log(ajv.errors);
          } else{
               next()
          }
          
     }    
}

module.exports = {validateBody}
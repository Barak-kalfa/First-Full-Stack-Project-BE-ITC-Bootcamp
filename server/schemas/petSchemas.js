const petSchema = {
   type: "object",
   properties: {
      type: {
         type: "string",
      },
      name: {
         type: "string",
      },
      adoptionStatus: {
         type: "string",
      },
      picture: {
         type: "string",
      },
      breed: {
         type: "string",
      },
      bio: {
         type: "string",
      },
      height: {
         type: "float",
      },
      weight: {
         type: "float",
      },
      color: {
         type: "string",
      },
      hypoallerganic: {
         type: "boolean",
      },
      dietary: {
         type: "string",
      },
      ownerId: {
         type: "integer",
      },
      fosterId: {
         type: "integer",
      }
   },
   required: ["type", "name", "picture"],
   additionalProperties: false,
};



///MORE SCHEMAS FOR PETS (WITH EVERY POST PUT ...)

module.exports = {petSchema}
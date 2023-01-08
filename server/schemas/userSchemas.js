const userSchema = {
   type: "object",
   properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      phone: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
   },
   required: ["email", "password", "firstName", "lastName"],
   additionalProperties: false,
};

module.exports = { userSchema };
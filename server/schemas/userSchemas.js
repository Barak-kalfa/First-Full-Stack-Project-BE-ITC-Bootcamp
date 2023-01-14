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

const loginSchema = {
   type: 'object',
   properties: {
      email: {type: 'string'},
      password: {type: 'string'}
   },
   required: ['email', 'password'],
   additionalProperties: false,
};

module.exports = { userSchema, loginSchema };
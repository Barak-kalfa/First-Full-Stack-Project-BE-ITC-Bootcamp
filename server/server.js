const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./routes/userRoutes.js");
const petsRoutes = require("./routes/petsRouts.js");
require("dotenv").config();
const dbConnection = require("./knex/knex");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookieParser())

app.use("/users", userRoutes);
app.use("/pets", petsRoutes);

dbConnection.migrate.latest().then((migration) => {
     if (migration) {
          console.log("Connected to DB", migration);
          app.listen(PORT, () => {
               console.log(`Listening on ${PORT}`);
          });
     }
});
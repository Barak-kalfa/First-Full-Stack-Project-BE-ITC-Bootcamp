const express = require("express")
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 8080
const userRoutes = require("./routes/userRoutes.js");
const petsRoutes = require("./routes/petsRouts.js");
const { updatePets } = require("./modules/pets_modules/petsModules.js");
require('dotenv').config()

app.use(express.json())
app.use(cors())


app.use('/users', userRoutes)
app.use("/pets", petsRoutes);

app.listen(PORT, ()=>{
     console.log(`Server is lisitening on ${PORT}`);
})
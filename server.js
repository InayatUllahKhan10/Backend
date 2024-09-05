const express = require ("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const cors = require("cors");

const userRoute = require("./routes/userRoute");
app.use(cors());

app.use(express.json());
app.use(morgan("dev"));

const USER_NAME = process.env.DB_USER_NAME;
const PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
// const PORT= 4000;
const DB_URI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.2affj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=mernCluster`;

mongoose.connect(DB_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

.then(() => {
    console.log("connected succesfully");
    app.listen(process.env.PORT || 8000 , (err) => {
        if(err) console.log(err);
        console.log("running sucessfully at" , process.env.PORT || 8000);
    }); 
})
.catch((error) =>{
    console.log("Connection error" , error);
});

// app.use("/api/user" , userRoute);
app.use(userRoute);
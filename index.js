require('dotenv').config()
const express = require("express");
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const {connection} = require("./config/db")
const {authRouter} = require("./routes/Auth.route")
const {jobRouter} = require("./routes/Job.route")
app.use(express.json());
app.use(cors());


app.use("/auth", authRouter)
app.use("/admin", jobRouter)

app.listen(PORT, () =>{
    connection();
    console.log(`http://localhost:${PORT}`);
})

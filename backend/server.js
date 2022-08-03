const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 7000;

app.use("/", require("./routes/goalRoutes"));

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

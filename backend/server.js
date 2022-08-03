const express = require("express");
const app = express();
require("dotenv").config();
require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");

const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoute"));
app.use("/api/users", require("./routes/userRoute"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

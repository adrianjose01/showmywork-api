const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/api", authRoute);
app.use("/api", userRoute);

mongoose
  .connect(
    "mongodb+srv://adrian:87456766@test.lowwjqz.mongodb.net/show?retryWrites=true&w=majority&appName=test"
  )
  .then((response) => {
    app.listen(3001, () => {
      console.log(`Server is running in http://localhost:3001`);
    });
  });

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const routes = require("./routes");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

const init = async () => {
  try {
    const DB_NAME = process.env.DB_NAME;
    //getting an error with `mongodb://localhost:27017/${DB_NAME} and server doesn't start, so replaced it with `mongodb://0.0.0.0:27017/${DB_NAME}`
    const MONGODB_URI =
      process.env.MONGODB_URI || `mongodb://0.0.0.0:27017/${DB_NAME}`;

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(MONGODB_URI, options);

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`[ERROR]: Failed to start server | ${error.message}`);
  }
};

init();

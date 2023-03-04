const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemRoutes = require("./src/routes/item");
//PORT SERVER
const port = process.env.PORT || 4000;
//DATABASE
const database =
  process.env.MONGO_URI ||
  "mongodb+srv://rizki:kuqnJVI5lUntdwzb@barang.gtwgtgh.mongodb.net/item?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());

//GET
app.use("/v1/item", itemRoutes);

mongoose
  .connect(database, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`server connect to ${port}, success....`)
    );
  })
  .catch((err) => console.log(err));

mongoose.connection.on("connected", () =>
  console.log(`${database}, terkoneksi...`)
);

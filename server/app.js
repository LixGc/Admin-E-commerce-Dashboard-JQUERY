require("dotenv").config();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandlers");
app.use(express.json()); //untuk terima data dari
app.use(express.urlencoded({ extended: true }));

app.use(cors()); //untuk nerima data dari client
app.use(require("./routes/index"));
//ERROR HANDLER

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

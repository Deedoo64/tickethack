const mongoose = require("mongoose");

const mongodb_url =
  "mongodb+srv://philippelacapsule:H1r0nd3773@cluster0.6dvqohn.mongodb.net/test";
const db_name = "TicketHack";
const connectionString = `mongodb+srv://didier:.didier@cluster1.ffivh9w.mongodb.net/${db_name}`;

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log(`Database "${db_name}" connected`))
  .catch((error) => console.error(error));

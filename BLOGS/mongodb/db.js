const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://boppenaprathyusha:Prathyusha1389@cluster0.yzg6uog.mongodb.net/mernproject?retryWrites=true&w=majority";
const mongodb = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("connected successfully");
    })
    .catch((error) => console.log(error));
};
module.exports = mongodb();


require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

console.log("MONGO_URI =", process.env.MONGO_URI);

const app = require("./app");
const connectDB = require("./config/database");

console.log("ENV CHECK:", process.env.MONGO_URI);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

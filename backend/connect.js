const dns = require("dns")

// Force Node.js to use Google DNS to resolve the MongoDB SRV record
dns.setServers(['8.8.8.8', '8.8.4.4']);
// require("mongoose")
// .connect(process.env.DB_KEY)
// .then(()=>{
//     console.log("Database is connected")
// })
// .catch(error => {
//     console.log(error)
// })


const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;

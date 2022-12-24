require("dotenv").config();
const mongoose = require('mongoose');
console.log(process.env.DATABASE);
// mongoose.connect(process.env.DATABASE || "mongodb://localhost:27017", {
// "mongodb://mesheatsRoot:Mu6BJmMgYvtM9te@ac-yzfgnvo-shard-00-00.d6numkx.mongodb.net:27017,ac-yzfgnvo-shard-00-01.d6numkx.mongodb.net:27017,ac-yzfgnvo-shard-00-02.d6numkx.mongodb.net:27017/mesheat?ssl=true&replicaSet=atlas-tbmyix-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect("mongodb://mesheatsRoot:Mu6BJmMgYvtM9te@ac-yzfgnvo-shard-00-00.d6numkx.mongodb.net:27017,ac-yzfgnvo-shard-00-01.d6numkx.mongodb.net:27017,ac-yzfgnvo-shard-00-02.d6numkx.mongodb.net:27017/mesheat?ssl=true&replicaSet=atlas-tbmyix-shard-0&authSource=admin&retryWrites=true&w=majority" || process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection
    .once("open", () => console.log("DB CONNECTED"))
    .on("error", (err) => console.log("Error while connecting DB", err));

module.exports = { mongoose }
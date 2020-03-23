const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');

mongoose
  .connect(
    `mongodb://${databaseConfig.user}:${databaseConfig.password}@cluster0-shard-00-00-aa5rx.mongodb.net:27017,cluster0-shard-00-01-aa5rx.mongodb.net:27017,cluster0-shard-00-02-aa5rx.mongodb.net:27017/${databaseConfig.database}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;

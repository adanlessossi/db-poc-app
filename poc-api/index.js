// const TortoiseDB = require('./tortoiseDB');
const TortoiseDB = require('./db/tortoiseDB.js');

const db = new TortoiseDB({
  name: 'demo',
  port: 3000,
  mongoURI: 'mongodb://localhost:27017',
  batchLimit: 1000
});

db.start();
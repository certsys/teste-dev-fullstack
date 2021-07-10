const http = require("http");
const database = require("./src/db/database");
const app = require('./app');
const port = 5118;

const httpServer = http.createServer(app);

database.connect().then(() => {
  httpServer.listen(port, () => {
    console.log("Backend Server running on port " + port);
  });
});
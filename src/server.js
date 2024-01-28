const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(
  "/Users/luisjorge/code/Flatiron-Phase-2/16-Phase-2-Project/titan-capital-financial/db.json"
);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 4000;

server.use(middlewares);
server.use(router);

server.listen(port);

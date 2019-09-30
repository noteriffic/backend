const server = require("./api/server");

const port = process.env.PORT || 8700;

server.listen(port, () => {
  console.log(`\n** SERVER RUNNING ON PORT ${port} **\n`);
});

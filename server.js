const express = require("express");
const userRouter = require("./routes/user.routes");
const { mongoConnection } = require("./configs/mongo.configs");
require("dotenv").config({});

const port = process.env.PORT;

const server = express();

server.use(express.json({}));
server.use(express.urlencoded({ extended: true }));

server.use("/user", userRouter);

const runServer = (port) => {
  mongoConnection()
    .then((res) => {
      server.listen(port);
      console.log(`Server is running on PORT ${port}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
runServer(port);

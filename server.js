"use strict";

const express = require("express");
const http = require("http");

const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoute");
const forumRouter = require("./routes/forumRoute");
const threadRouter = require("./routes/threadRoute");
const postRouter = require("./routes/postRoute");
const categoryRouter = require("./routes/categoryRoute");

const app = express();
app.use(express.json());

const { dbConnect } = require("./database/dbConnection");

/**
 * Database connection.
 */
global.databaseConnection = dbConnect();

/**
 * Express application for handling API routes.
 */
app.use("/api/users", userRouter);
app.use("/api/admins", adminRouter);
app.use("/api/forums", forumRouter);
app.use("/api/threads", threadRouter);
app.use("/api/posts", postRouter);
app.use("/api/categories", categoryRouter);

/**
 * HTTP server for the Express application.
 */
const server = http.createServer(app);

/**
 * Listens on the specified port.
 * @param {number} process.env.PORT - The port number for the server.
 */
server.listen(process.env.PORT, () => {
  console.log(`Listening to port http://localhost:${process.env.PORT}`);
});

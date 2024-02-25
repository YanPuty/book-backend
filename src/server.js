const express = require("express");
const morgan = require("morgan");
const path = require("path");
const controllers = require("./controllers");
const mongoConnection = require("./providers/mongo");
const HttpError = require("./errors/HttpError");
require("dotenv").config();

const app = express();

app.set("port", process.env.PORT || 3000);

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Middleware to parse JSON and URLENCODED bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use Morgan for logging
app.use(morgan("dev"));

// Registered controller
app.use("/api", controllers);

// Error handling middleware
app.use((err, req, res, next) => {
  // Handle known exceptions
  if (err instanceof HttpError) {
    const httpError = err;
    return res.status(httpError.statusCode).json(httpError.toJSON());
  }

  // Handle unknown exceptions
  if (err instanceof Error) {
    // Send an appropriate status code and error message back to the client
    return res.status(500).json({
      message: `Uncaught Exception: ${err.message}`,
      status: 500,
    });
  }
});

mongoConnection
  .then(() => {
    app.listen(app.get("port"), () => {
      console.log(path.join(__dirname, "public"));
      console.log(
        "App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env"),
      );
      console.log("Database Connected!");
      console.log("Press CTRL-C to stop\n");
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err.message);
    process.exit(1); // Exit process with failure
  });

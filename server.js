import express from "express";
import { routes } from "./routes/index.js";
import { initDb } from "./db/connect.js";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json())

app.use("/", routes);


initDb((err, mongodb) => {
    if (err) {
      console.error(err);
    } else {
      app.listen(process.env.PORT || 8080, () => {
        console.log(
          "Connected to DB and listening at port " + (process.env.PORT || 8080)
        );
      });
    }
  });


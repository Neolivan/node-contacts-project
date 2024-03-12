import { Router } from "express";
import { getAllContacts } from "../controllers/getAllcontacts.js";
import { getContactById } from "../controllers/getContactById.js";
import { newContact } from "../controllers/newContact.js";
import { updateContact } from "../controllers/updateContact.js";
import { deleteContact } from "../controllers/deleteContact.js";
import { readFileSync } from "fs";
import swaggerUi from "swagger-ui-express";

const routes = Router();

routes.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  next();
});

const rawSwaggerDocument = readFileSync("./api-docs.json");
const swaggerDocument = JSON.parse(rawSwaggerDocument);
routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

routes.get("/", (req, res) => {
  res.send("Contacts web services is running!");
});

routes.get("/contact", getAllContacts);

routes.get("/contact/:id", getContactById);

routes.post("/contact", newContact);

routes.put("/contact/:id", updateContact);

routes.delete("/contact/:id", deleteContact);

export { routes };

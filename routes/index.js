import { Router } from "express";
import { getAllContacts } from "../controllers/getAllcontacts.js";
import { getContactById } from "../controllers/getContactById.js";
import { newContact } from "../controllers/newContact.js";
import { updateContact } from "../controllers/updateContact.js";
import { deleteContact } from "../controllers/deleteContact.js";

const routes = Router();

routes.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  next();
});

routes.get("/", (req, res) => {
  res.send("Contacts web services is running!");
});

routes.get("/contact", getAllContacts);

routes.get("/contact/:id", getContactById);

routes.post("/contact", newContact);

routes.put("/contact/:id", updateContact);

routes.delete("/contact/:id", deleteContact);

export { routes };

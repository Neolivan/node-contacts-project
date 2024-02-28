import { Router } from "express";
import { getAllContacts } from "../controllers/getAllcontacts.js";
import { getContactById } from "../controllers/getContactById.js";


const routes = Router();

routes.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    next();
  });

routes.get('/', (req, res) => {
    res.send("Contacts web services is running!");
});

routes.get('/allContacts', getAllContacts);

routes.get('/contact', getContactById);

export {routes}
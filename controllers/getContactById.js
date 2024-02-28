import { ObjectId } from "mongodb";
import { getDb } from "../db/connect.js";

const getContactById = async (req, res, next) => {
    if (!req.query.id) {
      res.setHeader("Content-Type", "application/json");
      return res.status(400).json({ error: "missing id query parameter" });
    }
  
    try {
      const result = await getDb()
        .db()
        .collection("contacts")
        .findOne({ _id: new ObjectId(req.query.id) });
  
      if (!result) {
        res.setHeader("Content-Type", "application/json");
        return res.status(200).json({ message: "No user with this id :(" });
      }
  
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

export { getContactById };

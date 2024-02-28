import { getDb } from "../db/connect.js";

const getAllContacts = async (req, res, next) => {
    try {
        const result = await getDb().db().collection("contacts").find();
        const lists = await result.toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ error: "Internal server error" });
      }
};

export { getAllContacts };
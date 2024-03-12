import { ObjectId } from "mongodb";
import { getDb } from "../db/connect.js";

export const deleteContact = async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");

  try {
    const { id } = req.params;

    const result = await getDb()
      .db()
      .collection("contacts")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Contact deleted successfully" });
    } else {
      console.warn("Contact not found");
      return res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

import { ObjectId } from "mongodb";
import { getDb } from "../db/connect.js";

export const updateContact = async (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  const { id } = req.params;
  const contactData = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ error: "ID was not sent on the query parameters :(" });
  }
  if (!contactData) {
    return res
      .status(400)
      .json({ error: "No Parameter was sent to update :(" });
  }

  try {
    const result = await getDb()
      .db()
      .collection("contacts")
      .updateOne({ _id: new ObjectId(id) }, { $set: contactData });

    if (result.modifiedCount === 1) {
      return res.status(200).json({ message: "Contact updated successfully" });
    } else {
      console.warn("Contact not found or no changes were made");
      return res
        .status(404)
        .json({ error: "Contact not found or no changes were made" });
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

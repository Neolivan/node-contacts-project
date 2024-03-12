import { getDb } from "../db/connect.js";

function validateParams(param) {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "favoriteColor",
    "birthday",
  ];
  let isValid = true;
  let paramsMissing = [];

  const paramFields = Object.keys(param);

  requiredFields.forEach((field) => {
    if (!(paramFields.includes(field) && param[field])) {
      isValid = false;
      paramsMissing.push(field);
    }
  });

  return {
    isValid,
    paramsMissing,
  };
}

export const newContact = async (req, res, next) => {
  let isParamValid = validateParams(req.body);
  res.setHeader("Content-Type", "application/json");

  if (!isParamValid.isValid) {
    return res.status(400).json({
      error: `Some parameter is missing, check these fields: ${isParamValid.paramsMissing}`,
    });
  }

  try {
    const contactData = req.body;
    const result = await getDb()
      .db()
      .collection("contacts")
      .insertOne(contactData);

    console.log(result);
    if (result.insertedId) {
      return res.status(201).json({
        message: "Contact added successfully",
        contact: contactData,
      });
    } else {
      throw new Error("Failed to insert contact");
    }
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

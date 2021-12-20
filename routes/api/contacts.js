const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers/contacts");
const {
  createValidation,
  updateValidation,
} = require("../../midllewares/validation/contactsValidation");

router.get("/", getContacts);

router.get("/:id", getContactById);

router.post("/", createValidation, addContact);

router.delete("/:id", deleteContact);

router.put("/:id", updateValidation, updateContact);

module.exports = router;

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
  updateFavoriteValidation,
  validateId,
  validateQuery
} = require("../../midllewares/validation/contactsValidation");

router.get("/", validateQuery, getContacts);

router.get("/:id", getContactById, validateId);

router.post("/", createValidation, addContact);

router.delete("/:id", deleteContact, validateId);

router.put("/:id", updateValidation, updateContact);

router.patch("/:id/favorite", updateFavoriteValidation, validateId, updateContact);

module.exports = router;

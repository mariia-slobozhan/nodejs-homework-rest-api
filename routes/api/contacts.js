const express = require("express");
const router = express.Router();
const { contacts: contactsController } = require("../../controllers");

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = contactsController;

const {
  createValidation,
  updateValidation,
  updateFavoriteValidation,
  validateId,
  validateQuery,
} = require("../../midllewares/validation/contactsValidation");

const guard = require("../../midllewares/guard");

router.get("/", [guard, validateQuery], getContacts);

router.get("/:id", [guard, getContactById], validateId);

router.post("/", [guard, createValidation], addContact);

router.delete("/:id", [guard, deleteContact], validateId);

router.put("/:id", [guard, updateValidation], updateContact);

router.patch(
  "/:id/favorite",
  [guard, updateFavoriteValidation, validateId],
  updateContact
);

module.exports = router;

const express = require("express");
const router = express.Router();
const { contacts: contactsController } = require("../../controllers");
const { guard, validation } = require("../../midllewares");
const wrapper = require('../../midllewares/error-handler');

const {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = contactsController;

const { contactsValidation } = validation;

const {
  createValidation,
  updateValidation,
  updateFavoriteValidation,
  validateId,
  validateQuery,
} = contactsValidation;


router.get("/", [guard, validateQuery], wrapper(getContacts));

router.get("/:id", [guard, getContactById],  wrapper(validateId));

router.post("/", [guard, createValidation],  wrapper(addContact));

router.delete("/:id", [guard, deleteContact],  wrapper(validateId));

router.put("/:id", [guard, updateValidation],  wrapper(updateContact));

router.patch(
  "/:id/favorite",
  [guard, updateFavoriteValidation, validateId],
  updateContact
);

module.exports = router;

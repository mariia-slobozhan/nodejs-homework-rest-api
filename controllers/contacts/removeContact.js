const { contactsRep } = require("../../repository");
const { HttpCode } = require("../../config/constants");
const CustomError = require('../../config/custom-error');

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await contactsRep.removeContact(userId, id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

module.exports = deleteContact;

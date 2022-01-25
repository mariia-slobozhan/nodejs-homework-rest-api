const { contactsRep } = require("../../repository");
const { HttpCode } = require("../../config/constants");
const CustomError = require('../../config/custom-error');

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const contact = await contactsRep.updateContact(userId, id, req.body);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  throw new CustomError(HttpCode.NOT_FOUND, "Not found");
};

module.exports = updateContact;

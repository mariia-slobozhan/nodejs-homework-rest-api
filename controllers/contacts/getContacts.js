const { contactsRep } = require("../../repository");
const { HttpCode } = require("../../config/constants");

const getContacts = async (req, res, next) => {
  const { id: userId } = req.user;
  const contacts = await contactsRep.listContacts(userId, req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: { ...contacts } });
};

module.exports = getContacts;

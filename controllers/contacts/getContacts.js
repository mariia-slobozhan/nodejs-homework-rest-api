const repositoryContacts = require("../../repository/contacts");
const HttpCode = require("../../config/constants");

const getContacts = async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts(req.query);
  res
    .status(HttpCode.OK)
    .json({ status: "success", code: HttpCode.OK, data: {...contacts } });
};

module.exports = getContacts;

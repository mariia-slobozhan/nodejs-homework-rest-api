const repository = require("../../repository/contacts");
const HttpCode = require("../../config/constants");

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await repository.removeContact(id);
  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, data: { contact } });
  }
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
};

module.exports = deleteContact;

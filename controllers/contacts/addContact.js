const { contactsRep } = require("../../repository");
const { HttpCode } = require("../../config/constants");


const addContact = async (req, res, next) => {
  console.log(req)
  const { id: userId } = req.user;
  const newContact = await contactsRep.addContact(userId, req.body);
  return res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.OK,
    data: { contact: newContact },
  });
};

module.exports = addContact;

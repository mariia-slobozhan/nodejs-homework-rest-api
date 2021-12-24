const model = require('../../model/contacts');

const getContacts = async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
}

module.exports = getContacts;
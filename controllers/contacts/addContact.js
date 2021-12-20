const model = require('../../model/contacts');

const addContact = async (req, res, next) => {
  const contact = await model.addContact(req.body);
  return res.status(201).json(contact);
}

module.exports = addContact;
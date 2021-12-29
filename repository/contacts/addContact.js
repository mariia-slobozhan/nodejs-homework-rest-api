const Contact = require('../../models/Contact');

const addContact = async ({name, email, phone}) => {
  const result = await Contact.create({name, email, phone});
  return result;
};
module.exports = addContact;

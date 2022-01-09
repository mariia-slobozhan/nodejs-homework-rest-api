const Contact = require('../../models/Contact');

const addContact = async (userId,{name, email, phone}) => {
  const result = await Contact.create({name, email, phone, owner: userId});
  return result;
};
module.exports = addContact;

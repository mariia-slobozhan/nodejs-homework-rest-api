const Contact = require('../../models/Contact');

const removeContact = async (contactId) => {
  const  result  = await Contact.findByIdAndRemove({ _id: contactId });
  return result;
};

module.exports = removeContact;

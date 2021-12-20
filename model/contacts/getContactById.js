const contacts = require('../../db/contacts.json')

const getContactById = async (contactId) => {
  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
}
  
  
module.exports = getContactById;
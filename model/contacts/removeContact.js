const fs = require('fs/promises');
const path = require('path');
const contacts = require('../../db/contacts.json')


const contactsPath = path.join(__dirname, '../../db/contacts.json');

const removeContact = async (contactId) => {
  const deletedContact = contacts.find((contact) => contact.id === contactId);
  const indexOfDeletedElement = contacts.indexOf(deletedContact);
  const newList = contacts.splice(indexOfDeletedElement, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newList;    
}
  
  
module.exports = removeContact;
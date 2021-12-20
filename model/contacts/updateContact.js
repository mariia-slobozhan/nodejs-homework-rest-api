const fs = require('fs/promises');
const path = require('path');
const contacts = require('../../db/contacts.json')


const contactsPath = path.join(__dirname, '../../db/contacts.json');

const updateContact = async (contactId, body) => {
  const updatedContact = contacts.find((contact) => contact.id === contactId);
  const index = contacts.indexOf(updatedContact);
  
  if (index !== -1) {
    const updatedContact = { id: contactId,...contacts[index], ...body };
    contacts[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  }    
}

module.exports = updateContact;
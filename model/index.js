const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const contacts = require('./contacts.json')


 const contactsPath = path.join(__dirname, 'contacts.json');


const listContacts = async() => {
  return contacts;
  }
  
const getContactById = async (contactId) => {
  const [result] = contacts.filter((contact) => contact.id === contactId);
  return result;
  }
  
const removeContact = async (contactId) => {
  const deletedContact = contacts.find((contact) => contact.id === contactId);
  const indexOfDeletedElement = contacts.indexOf(deletedContact);
  const newList = contacts.splice(indexOfDeletedElement, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newList;
    
  }
  
const addContact = async ({ name, email, phone }) => {
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}
  
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

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact };
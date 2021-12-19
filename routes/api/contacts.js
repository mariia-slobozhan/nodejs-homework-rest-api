const express = require('express');
const router = express.Router();
const model = require('../../model/index');
const validation = require('./validation')

router.get('/', async (req, res, next) => {
  const contacts = await model.listContacts();
  res.status(200).json(contacts);
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);    
  }
  res.status(404).json({ "message": 'Not found' });  
})

router.post('/', validation.createValidation, async (req, res, next) => {
  const contact = await model.addContact(req.body);
  return res.status(201).json(contact);
})

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.removeContact(id);
    if (contact) {
    return res.status(200).json({"message": "Contact deleted"});    
  }
  res.status(404).json({ "message": 'Not found' }); 
})

router.put('/:id', validation.updateValidation, async (req, res, next) => {
   const { id } = req.params;
   const contact = await model.updateContact(id, req.body);
   if (contact) {
    return res.status(200).json(contact);    
  }
  res.status(404).json({"message": "Not found" });
})

module.exports = router;

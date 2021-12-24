const model = require('../../model/contacts');

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await model.getContactById(id);
  if (contact) {
    return res.status(200).json(contact);    
  }
  res.status(404).json({ "message": 'Not found' });  
}

module.exports = getContactById;
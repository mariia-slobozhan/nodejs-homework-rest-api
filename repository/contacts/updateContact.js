const Contact = require('../../models/Contact');

const updateContact = async (contactId, body) => {
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, body, {
    new: true,
    runValidators: true
  });
  return result;
};

module.exports = updateContact;

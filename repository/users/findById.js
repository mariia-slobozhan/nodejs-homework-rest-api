const User = require('../../models/User');


const findById = async (id) => {
    return await User.findById(id);
}


module.exports = findById;
const User = require('../../models/User');


const create = async (body) => {
    const user = new User(body);
    return user.save();
};

module.exports = create;
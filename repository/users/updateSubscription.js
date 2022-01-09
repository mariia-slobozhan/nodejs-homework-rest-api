const User = require("../../models/User");

const updateSubscription = async (id, body) => {
   const result = await User.findOneAndUpdate({ _id: id }, body, {
    new: true,
    runValidators: true
  });
  return result;
};

module.exports = updateSubscription;

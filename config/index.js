const jwt = require('jsonwebtoken');
const User = require('../models/User');
const tokenVerify = async (token) => {
  if (token) {
    try {
      const authUser = jwt.verify(token, 'hjdsjdh');
      const { id } = authUser;
      const user = await User.findById(id);
      return user;
    } catch (err) {
      return err;
    }
  }
};

module.exports = { tokenVerify };

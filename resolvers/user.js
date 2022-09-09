const bcrypt = require('bcryptjs');
const User = require('../models/User');

const userResolvers = {
  Query: {
    user: () => 'User',
  },
  Mutation: {
    registerUser: async (root, args, context, info) => {
      const { name, email, password } = args.user;
      try {
        const user = await User.findOne({ email });
        if (user) {
          throw new Error('user alredy register');
        }
        newUser = new User({
          name,
          email,
          password,
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        const data = await newUser.save();
        console.log(data);
        return newUser;
      } catch (err) {
        return err;
      }
    },
  },
};

module.exports = userResolvers;

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const secretOrKey = 'hjdsjdh';

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
    loginUser: async (root, args, context, info) => {
      const { email, password } = args.user;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('No user found with this email');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);
        if (isMatch === false) {
          throw new Error('Password did not match');
        }
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email,
          };
          const token = jwt.sign(payload, secretOrKey, { expiresIn: 36000 });
          return token;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = userResolvers;

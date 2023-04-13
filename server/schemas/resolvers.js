const { Users } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
   
    users: async () => {
      return Users.find({});
    },
    user: async (parent, { username }) => {
      return Users.findOne({ username }).populate('thoughts');
    },
  },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await Users.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await Users.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
    },
  }, 
};

module.exports = resolvers;

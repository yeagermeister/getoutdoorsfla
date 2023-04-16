const { Users } = require('../models');
const { NewSite } = require('../models');
const { Site } = require('../models');
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
    newSite: async () => {
      return NewSite.find({});
    }
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
      addSite: async (parent, {siteName, description, zipcode, camping, pets, statepark, park, beach, swimmingHole, spring, free}) => {
        const newSite = await NewSite.create( {siteName, description, zipcode, camping, pets, statepark, park, beach, swimmingHole, spring, free})
        const token = signToken(newSite);
        return { token, newSite };
        // const user = await Users.findOne({_ID});
        // if (!user) {
        //   throw new AuthenticationError('No user found with this ID');
        // }


      },
      addProdSite: async (parent, {siteName, description, imageURL, zipcode, camping, pets, statepark, park, beach, swimmingHole, spring, free}) => {
        const prodSite = await Site.create( {siteName, description, imageURL, zipcode, camping, pets, statepark, park, beach, swimmingHole, spring, free, lat, lon})
        const token = signToken(prodSite);
        return { token, prodSite };
      }
  }
};

module.exports = resolvers;

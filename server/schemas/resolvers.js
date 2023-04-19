const { Users, NewSite, Site, Comment, Rating } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    findAllUsers: async () => {
      return Users.find({});
    },
    findOneUser: async (parent, { username }) => {
      return Users.findOne({ username });
    },
    findAllNewSites: async () => {
      return NewSite.find({});
    },
    findOneNewSite: async () => {
      return NewSite.findOne({ siteName });
    },
    findAllSites: async () => {
      return Site.find({});
    },
    findOneSite: async () => {
      return Site.findOne({ siteName: siteName }).populate('Comments').populate('Ratings');
    },
    findUserComments: async() => {
      Users.findOne({username: username})
      return 
    }

  },
  
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = await Users.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      },
      deleteUser: async (_, { id }) => {
        // Code to delete the user with the specified ID from the database or data source
        const deletedUser = await Users.findByIdAndDelete(id);
        return deletedUser;
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
      addSite: async (parent, { NewSite }) => {
        const newSite = await NewSite.create( {NewSite});
        return newSite ;
        
      },
      addProdSite: async (parent, {site}) => {
        try{console.log(site, "site");
        const prodSite = await Site.create(site);
      
        return prodSite;
      }
        catch(err){
          console.log(err)
        }  
      }
  }
};

module.exports = resolvers;

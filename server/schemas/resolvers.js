const { Users } = require('../models');

const resolvers = {
  Query: {
   
    user: async () => {
      return Users.find({});
    },
    
  },
 
};

module.exports = resolvers;

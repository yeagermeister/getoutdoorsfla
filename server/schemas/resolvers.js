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
      return Users.findOne({ username });
    },
    newSite: async () => {
      return NewSite.find({});
    },
    Site: async () => {
      return Site.find({});
    },
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
        console.log(site, "site");
        const prodSite = await Site.create(site);
        return prodSite;
      },

      addComment: async (parent, { comment, siteId }, context) => {
        if (context.user) {
          const newComment = await Comment.create({
            comment,
            username: context.user._id,
            site: siteId,
          });
          await Site.findByIdAndUpdate(siteId, { $push: { comments: newComment._id } });
          return newComment;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      deleteComment: async (parent, { commentId }, context) => {
        if (context.user) {
          const comment = await Comment.findById(commentId);
          if (comment.username.toString() === context.user._id.toString()) {
            await Site.findByIdAndUpdate(comment.site, { $pull: { comments: comment._id } });
            await comment.delete();
            return comment;
          }
          throw new AuthenticationError('You cannot delete this comment');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      addRating: async (parent, { rating, siteId }, context) => {
        if (context.user) {
          const newRating = await Rating.create({
            rating,
            username: context.user._id,
            site: siteId,
          });
          await Site.findByIdAndUpdate(siteId, { $push: { ratings: newRating._id } });
          return newRating;
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      deleteRating: async (parent, { ratingId }, context) => {
        if (context.user) {
          const rating = await Rating.findById(ratingId);
          if (rating.username.toString() === context.user._id.toString()) {
            await Site.findByIdAndUpdate(rating.site, { $pull: { ratings: rating._id } });
            await rating.delete();
            return rating;
          }
          throw new AuthenticationError('You cannot delete this rating');
        }
        throw new AuthenticationError('You need to be logged in!');
      },
    },
  };
  
  module.exports = resolvers;
  ``
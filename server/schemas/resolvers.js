const { Users, NewSite, Site, Comment, Rating } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const resolvers = {
  Query: {
    findAllUsers: async () => {
      return Users.find({});
    },
    findOneUser: async (parent, { username }) => {
      return Users.findOne({ username }).populate('comments').populate('ratings');
    },
    findAllNewSites: async () => {
      return NewSite.find({});
    },
    findOneNewSite: async (parent, { _id }) => {
      return NewSite.findOne({ _id });
    },
    findAllSites: async () => {
      return Site.find({});
    },
    findOneSite: async (parent, { _id }) => {
      const site = await Site.findOne({ _id }).populate({
        path: 'comments',
        populate: {
          path: 'userID',
          select: 'username',
        },
      })
      .populate('ratings')
      .lean({ virtuals: true });
      return site;
    },
    findUserComments: async (parent, { userID }) => {
      const comments = Comment.find({ userID }).populate('site');
      return comments;
    },
    findUserRatings: async (parent, { userID }) => {
      const ratings = Rating.find({ userID }).populate('site');
      return ratings;
    },
    getRatingByUserAndSite: async (parent, { siteId }, { user }) => {
      if (user) {
        const rating = await Rating.findOne({ site: siteId, userID: user._id });
        return rating;
      }
      throw new AuthenticationError('You need to be logged in!');
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
    addSite: async (parent, { zipcode, siteName, description, camping, pets, statepark, park, beach, swimmingHole, spring, free }) => {
      const newSite = await NewSite.create({ zipcode, siteName, description, camping, pets, statepark, park, beach, swimmingHole, spring, free });
      return newSite;
    },
    deleteSite: async (_, { id }) => {
      const deletedNewSite = await NewSite.findByIdAndDelete(id);
      return deletedNewSite;
    },
    addProdSite: async (parent, { siteName, description, zipcode, camping, pets, statepark, park, beach, swimmingHole, spring, free, lat, lon, imageURL, altText }) => {
      const prodSite = await Site.create({ siteName, description, zipcode, camping, pets, statepark, park, beach, swimmingHole, spring, free, lat, lon, imageURL, altText });
      return prodSite;
    },
    addComment: async (parent, { siteID, commentText }, { user }) => {
      if (user) {
        const comment = await Comment.create({
          site: siteID,
          commentText,
          userID: user._id,
        });
        await Site.findOneAndUpdate(
          { _id: siteID },
          { $addToSet: { comments: comment._id } }
        );
        return comment;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteComment: async (parent, { commentID }, { user }) => {
      if (user) {
        const comment = await Comment.findById(commentID);
        if (comment.userID.toString() === user._id.toString()) {
          await Site.findOneAndUpdate(
            { _id: comment.site },
            { $pull: { comments: commentID } }
          );
          const deletedComment = await Comment.findByIdAndDelete(commentID);
          return deletedComment;
        } else {
          throw new AuthenticationError('You are not authorized to delete this comment!');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addRating: async (parent, { siteID, rating }, { user }) => {
      if (user) {
        const existingRating = await Rating.findOne({ site: siteID, userID: user._id });
        if (existingRating) {
          existingRating.rating = rating;
          await existingRating.save();
          return existingRating;
        }
        const newRating = await Rating.create({
          site: siteID,
          rating,
          userID: user._id,
        });
        await Site.findOneAndUpdate(
          { _id: siteID },
          { $addToSet:  { ratings: newRating._id } }
        );
        return newRating;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteRating: async (parent, { ratingID }, { user }) => {
      if (user) {
        const rating = await Rating.findById(ratingID);
        if (rating.userID.toString() === user._id.toString()) {
          await Site.findOneAndUpdate(
            { _id: rating.site },
            { $pull: { ratings: ratingID } }
          );
          const deletedRating = await Rating.findByIdAndDelete(ratingID);
          return deletedRating;
        } else {
          throw new AuthenticationError('You are not authorized to delete this rating!');
        }
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  };

  module.exports = resolvers
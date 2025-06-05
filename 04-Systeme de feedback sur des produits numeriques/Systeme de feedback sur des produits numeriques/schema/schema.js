const graphql = require("graphql");
const Feedback = require("../models/Feedback");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = graphql;

// Type Feedback
const FeedbackType = new GraphQLObjectType({
  name: "Feedback",
  fields: () => ({
    id: { type: GraphQLID },
    utilisateur: { type: GraphQLString },
    produit: { type: GraphQLString },
    note: { type: GraphQLInt },
    commentaire: { type: GraphQLString },
    dateSoumission: { type: GraphQLString },
  }),
});

// Requêtes
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    feedbacks: {
      type: new GraphQLList(FeedbackType),
      resolve() {
        return Feedback.find();
      },
    },
    feedbackById: {
      type: FeedbackType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Feedback.findById(args.id);
      },
    },
    feedbacksParProduit: {
      type: new GraphQLList(FeedbackType),
      args: { produit: { type: GraphQLString } },
      resolve(_, args) {
        return Feedback.find({ produit: args.produit });
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addFeedback: {
      type: FeedbackType,
      args: {
        utilisateur: { type: new GraphQLNonNull(GraphQLString) },
        produit: { type: new GraphQLNonNull(GraphQLString) },
        note: { type: new GraphQLNonNull(GraphQLInt) },
        commentaire: { type: new GraphQLNonNull(GraphQLString) },
        dateSoumission: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const feedback = new Feedback(args);
        return feedback.save();
      },
    },
    updateFeedback: {
      type: FeedbackType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        commentaire: { type: GraphQLString },
      },
      async resolve(_, args) {
        return await Feedback.findByIdAndUpdate(
          args.id,
          { commentaire: args.commentaire },
          { new: true }
        );
      },
    },
    deleteFeedback: {
      type: FeedbackType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Feedback.findByIdAndDelete(args.id);
      },
    },
    deleteAllFeedbacks: {
      type: GraphQLString,
      async resolve() {
        await Feedback.deleteMany({});
        return "Tous les feedbacks ont été supprimés.";
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

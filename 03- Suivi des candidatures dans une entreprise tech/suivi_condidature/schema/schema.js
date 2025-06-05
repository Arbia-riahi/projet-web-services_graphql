const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const Candidature = require('../models/Candidature');

const CandidatureType = new GraphQLObjectType({
  name: 'Candidature',
  fields: () => ({
    id: { type: GraphQLID },
    nom: { type: GraphQLString },
    email: { type: GraphQLString },
    poste: { type: GraphQLString },
    statut: { type: GraphQLString },
    commentaire: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    candidatures: {
      type: new GraphQLList(CandidatureType),
      resolve() {
        return Candidature.find();
      }
    },
    candidatureById: {
      type: CandidatureType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Candidature.findById(args.id);
      }
    },
    candidaturesParStatut: {
      type: new GraphQLList(CandidatureType),
      args: { statut: { type: GraphQLString } },
      resolve(_, args) {
        return Candidature.find({ statut: args.statut });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCandidature: {
      type: CandidatureType,
      args: {
        nom: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        poste: { type: new GraphQLNonNull(GraphQLString) },
        statut: { type: GraphQLString },
        commentaire: { type: GraphQLString }
      },
      resolve(_, args) {
        const c = new Candidature(args);
        return c.save();
      }
    },
    updateCandidature: {
      type: CandidatureType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        statut: { type: GraphQLString },
        commentaire: { type: GraphQLString }
      },
      resolve(_, args) {
        return Candidature.findByIdAndUpdate(args.id, args, { new: true });
      }
    },
    deleteCandidature: {
      type: CandidatureType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Candidature.findByIdAndDelete(args.id);
      }
    },
    deleteAllCandidatures: {
      type: GraphQLString,
      async resolve() {
        await Candidature.deleteMany({});
        return 'Toutes les candidatures ont été supprimées.';
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
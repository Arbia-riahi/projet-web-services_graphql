const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

const Reservation = require('../models/Reservation');

const ReservationType = new GraphQLObjectType({
  name: 'Reservation',
  fields: () => ({
    id: { type: GraphQLID },
    utilisateur: { type: GraphQLString },
    salle: { type: GraphQLString },
    date: { type: GraphQLString },
    heure: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    reservations: {
      type: new GraphQLList(ReservationType),
      resolve() {
        return Reservation.find();
      }
    },
    reservationById: {
      type: ReservationType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Reservation.findById(args.id);
      }
    },
    reservationsParSalle: {
      type: new GraphQLList(ReservationType),
      args: { salle: { type: GraphQLString } },
      resolve(_, args) {
        return Reservation.find({ salle: args.salle });
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addReservation: {
      type: ReservationType,
      args: {
        utilisateur: { type: new GraphQLNonNull(GraphQLString) },
        salle: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        heure: { type: new GraphQLNonNull(GraphQLString) }
      },
      async resolve(_, args) {
        const exists = await Reservation.findOne({ salle: args.salle, date: args.date, heure: args.heure });
        if (exists) throw new Error('Créneau déjà réservé');
        const r = new Reservation(args);
        return r.save();
      }
    },
    updateReservation: {
      type: ReservationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        utilisateur: { type: GraphQLString },
        salle: { type: GraphQLString },
        date: { type: GraphQLString },
        heure: { type: GraphQLString }
      },
      resolve(_, args) {
        return Reservation.findByIdAndUpdate(args.id, args, { new: true });
      }
    },
    deleteReservation: {
      type: ReservationType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Reservation.findByIdAndDelete(args.id);
      }
    },
    deleteAllReservations: {
      type: GraphQLString,
      async resolve() {
        await Reservation.deleteMany({});
        return 'Toutes les réservations ont été supprimées.';
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
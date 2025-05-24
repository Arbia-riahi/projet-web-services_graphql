// On importe les types nécessaires depuis la bibliothèque 'graphql'
const {
  GraphQLObjectType,   // Permet de définir un type d'objet GraphQL (ex: Freelance, Query, Mutation)
  GraphQLString,       // Représente une chaîne de caractères
  GraphQLList,         // Représente une liste (ex: liste de freelances)
  GraphQLSchema,       // Pour créer le schéma principal GraphQL
  GraphQLNonNull,      // Pour dire qu’un champ est obligatoire (non nul)
  GraphQLID            // Pour représenter un identifiant unique (comme MongoDB _id)
} = require('graphql');

// On importe le modèle Mongoose Freelance (structure de la collection MongoDB)
const Freelance = require('../models/Freelance');



// Définition du type GraphQL "Freelance", utilisé dans les réponses et les mutations
const FreelanceType = new GraphQLObjectType({
  name: 'Freelance',
  fields: () => ({
    id: { type: GraphQLID },                               // Identifiant MongoDB
    nom: { type: GraphQLString },                          // Nom du freelance
    prenom: { type: GraphQLString },                       // Prénom
    email: { type: GraphQLString },                        // Email
    competences: { type: new GraphQLList(GraphQLString) }, // Liste de compétences
    liensPro: { type: new GraphQLList(GraphQLString) }     // Liens professionnels (GitHub, LinkedIn...)
  })
});


// Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Requête pour récupérer tous les freelances
    freelances: {
      type: new GraphQLList(FreelanceType),
      resolve() {
        return Freelance.find(); // Exécution d'une requête MongoDB pour retourner tous les freelances
      }
    },

    // Requête pour récupérer un freelance avec un ID donné (optionnel)
    freelance: {
      type: FreelanceType,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return Freelance.findById(args.id);
      }
    },

    // Requête plus stricte pour récupérer un freelance avec un ID obligatoire (GraphQLNonNull)
    freelanceById: {
      type: FreelanceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(_, args) {
        return Freelance.findById(args.id); // Retourne un seul freelance par son ID
      }
    }
  }
});




// Mutations
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
       addFreelance: {
      type: FreelanceType,
      args: {
        nom: { type: new GraphQLNonNull(GraphQLString) },      // Requis
        prenom: { type: new GraphQLNonNull(GraphQLString) },   // Requis
        email: { type: new GraphQLNonNull(GraphQLString) },    // Requis
        competences: { type: new GraphQLList(GraphQLString) }, // Optionnel
        liensPro: { type: new GraphQLList(GraphQLString) }     // Optionnel
      },
      resolve(_, args) {
        const newFreelance = new Freelance(args);  // Création d'un nouveau freelance
        return newFreelance.save();                // Sauvegarde dans MongoDB
      }
    },


       updateFreelance: {
      type: FreelanceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },           // ID requis pour savoir qui modifier
        nom: { type: GraphQLString },                          // Champs modifiables
        prenom: { type: GraphQLString },
        email: { type: GraphQLString },
        competences: { type: new GraphQLList(GraphQLString) },
        liensPro: { type: new GraphQLList(GraphQLString) }
      },
      resolve(_, args) {
        return Freelance.findByIdAndUpdate(args.id, args, { new: true }); // Mise à jour MongoDB
      }
    },


       deleteFreelance: {
      type: FreelanceType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) } // ID requis pour supprimer un freelance
      },
      resolve(_, args) {
        return Freelance.findByIdAndDelete(args.id); // Suppression MongoDB
      }
    },


    deleteAllFreelances: {
      type: GraphQLString, // Retourne un simple message texte
      resolve: async () => {
        await Freelance.deleteMany({}); // Supprime tous les documents de la collection
        return "Tous les freelances ont été supprimés."; // Message de confirmation
      }
    }
  }
});


// On exporte le schéma GraphQL contenant les queries et mutations
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

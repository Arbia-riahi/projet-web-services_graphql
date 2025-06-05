const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/cnx");

const app = express();

// Connexion MongoDB
connectDB();

// Middleware GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true, // Interface web GraphiQL
  })
);

// Démarrage serveur
app.listen(4000, () => {
  console.log(" Serveur démarré sur http://localhost:4000/graphql");
});

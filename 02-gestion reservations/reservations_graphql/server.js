const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/conexion');
const schema = require('./schema/schema');

const app = express();
connectDB();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log(' Serveur GraphQL lancé sur http://localhost:4000/graphql');
});

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
require('./config/conexion');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Serveur sur http://localhost:4000/graphql');
});

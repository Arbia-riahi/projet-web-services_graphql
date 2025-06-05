# Suivi des candidatures - Application GraphQL + MongoDB

Ce projet permet à une entreprise tech de suivre les candidatures des postulants via une API GraphQL connectée à une base de données MongoDB.

## Architecture du projet

### `server.js`

Point d’entrée de l’application :

- importe Express et `express-graphql`
- configure le endpoint `/graphql`
- connecte à MongoDB
- lance le serveur sur le port 4000

### `config/conexion.js`

Gère la connexion à la base de données MongoDB via `mongoose.connect`.

### `models/Candidature.js`

Modèle de données Mongoose pour une candidature :

- `nom` : nom du candidat
- `email` : adresse email
- `poste` : poste visé
- `dateSoumission` : date de dépôt
- `etat` : état d’avancement (en attente, accepté, rejeté)
- `commentaires` : remarques internes

### `schema/schema.js`

Définit le schéma GraphQL et la logique :

- **types** : `Candidature`
- **requêtes** : `candidatures`, `candidatureById`, `candidaturesParPoste`, etc.
- **mutations** : `addCandidature`, `updateCandidature`, `deleteCandidature`, `deleteAllCandidatures`
- inclut les interactions MongoDB et la validation des données

### `schema.graphql` (optionnel)

Documente le schéma GraphQL au format SDL (utilisé avec des outils comme Apollo Studio ou Postman).

## Démarrer le projet

nodemon server.js

## Requêtes & Mutations GraphQL – Exemples


### Lister toutes les candidatures

```graphql
query {
  candidatures {
    id
    nom
    email
    poste
    dateSoumission
    etat
  }
}
```

### Filtrer les candidatures par poste

query {
  candidaturesParPoste(poste: "Développeur Fullstack") {
    nom
    email
    etat
  }
}

### Récupérer une candidature par ID

query {
  candidatureById(id: "") {
    nom
    poste
    dateSoumission
    etat
  }
}

### Ajouter une candidature

mutation {
  addCandidature(
    nom: "Fatma",
    email: "fatma@example.com",
    poste: "QA Engineer",
    dateSoumission: "2024-06-01",
    etat: "En attente"
  ) {
    id
    nom
  }
}

### Modifier une candidature

mutation {
  updateCandidature(id: "   ", etat: "Acceptée") {
    id
    etat
  }
}

### Supprimer une candidature

mutation {
  deleteCandidature(id: "...") {
    id
    nom
  }
}

### Supprimer toutes les candidatures

mutation {
  deleteAllCandidatures
}

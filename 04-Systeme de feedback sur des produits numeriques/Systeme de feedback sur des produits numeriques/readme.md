# Système de Feedback - Produits Numériques (SaaS)

Ce projet permet à une entreprise SaaS de recueillir automatiquement des retours utilisateurs (avis, notes) sur ses produits numériques via une API GraphQL connectée à une base MongoDB.

---

## Architecture du projet

### `server.js`

Point d’entrée principal de l’application :

- importe Express et `express-graphql`
- configure le endpoint `/graphql`
- initialise la connexion MongoDB
- démarre le serveur sur le port 4000

### `config/conexion.js`

Gère la connexion à MongoDB via `mongoose.connect`, en affichant le statut de la connexion (succès ou erreur).

### `models/Feedback.js`

Modèle Mongoose représentant un retour utilisateur (feedback) :

- `utilisateur` : nom ou identifiant de l’utilisateur
- `produit` : nom ou identifiant du produit
- `note` : note attribuée (ex : 1 à 5)
- `commentaire` : retour libre
- `dateSoumission` : date de l’avis

Ce modèle garantit la structure des données et facilite les requêtes MongoDB.

### `schema/schema.js`

Contient la définition du schéma GraphQL :

- **types** : `Feedback`
- **requêtes** :
  - `feedbacks`
  - `feedbackById`
  - `feedbacksParProduit`
- **mutations** :
  - `addFeedback`
  - `updateFeedback`
  - `deleteFeedback`
  - `deleteAllFeedbacks`
- intègre la validation des champs (note comprise entre 1 et 5, texte non vide, etc.)

### `schema.graphql` (optionnel)

Documentation du schéma en SDL (Schema Definition Language) — utile pour Apollo Studio ou tout autre outil de documentation.

---

## Exemples de Requêtes & Mutations GraphQL

### Lister tous les feedbacks

query {
  feedbacks {
    id
    utilisateur
    produit
    note
    commentaire
    dateSoumission
  }
}

### Filtrer par produit

query {
  feedbacksParProduit(produit: "Application Mobile Pro") {
    utilisateur
    note
    commentaire
  }
}


### Récupérer un feedback par ID

query {
  feedbackById(id: "....") {
    utilisateur
    produit
    note
    commentaire
  }
}


### Ajouter un feedback

mutation {
  addFeedback(
    utilisateur: "Ali",
    produit: "CRM Web",
    note: 5,
    commentaire: "Très intuitive et rapide !",
    dateSoumission: "2024-06-01"
  ) {
    id
    utilisateur
  }
}


### Modifier un feedback


mutation {
  updateFeedback(id: "....", commentaire: "Après mise à jour, c’est encore mieux !") {
    id
    commentaire
  }
}


### Supprimer un feedback

mutation {
  deleteFeedback(id: ".....") {
    id
    utilisateur
  }
}


### Supprimer tous les feedbacks

mutation {
  deleteAllFeedbacks
}

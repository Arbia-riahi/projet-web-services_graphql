# Réservation intelligente pour espaces de coworking

---

## Architecture du projet et rôle des fichiers

### `server.js`

C’est le point d’entrée principal de l’application. Il :

* importe Express et `express-graphql`
* connecte la base de données
* configure le endpoint `/graphql`
* démarre le serveur sur le port 4000

### `config/conexion.js`

Fichier de connexion à MongoDB. Il utilise `mongoose.connect`pour :

* connecter l’application à la base de données MongoDB
* afficher une confirmation de connexion ou une erreur

### `models/Reservation.js`

Définit le modèle de données pour les réservations avec Mongoose. Il permet de :

* structurer les champs (utilisateur, salle, date, heure)
* garantir que chaque enregistrement respecte un format valide
* interagir facilement avec MongoDB via `Reservation.find()`, `save()`, etc.

### `schema/schema.js`

Décrit :

* les types GraphQL (type Reservation)
* les requêtes (`reservations`, `reservationById`, etc.)
* les mutations (`addReservation`, `updateReservation`, ...)
* la logique métier : validation des créneaux, interaction MongoDB

### `schema.graphql`

Fichier texte pour documenter le schéma GraphQL en SDL (Schema Definition Language), utile pour la lecture humaine ou pour des outils comme Apollo.

---

---

## Tests des requêtes et mutations GraphQL

### Lister toutes les réservations

```
query {
  reservations {
    id
    utilisateur
    salle
    date
    heure
  }
}
```

### Filtrer par salle

```
query {
  reservationsParSalle(salle: "Salle A") {
    utilisateur
    date
    heure
  }
}
```

### Récupérer par ID

```
query {
  reservationById(id: "ID_RÉEL") {
    utilisateur
    salle
    date
    heure
  }
}
```

### Ajouter une réservation

```
mutation {
  addReservation(utilisateur: "Fatma", salle: "Salle A", date: "2024-06-01", heure: "10:00") {
    id
    utilisateur
  }
}
```

### Modifier une réservation

```
mutation {
  updateReservation(id: "ID_RÉEL", heure: "15:00") {
    id
    heure
  }
}
```

### Supprimer une réservation

```
mutation {
  deleteReservation(id: "ID_RÉEL") {
    id
    utilisateur
  }
}
```

### Supprimer toutes les réservations

```
mutation {
  deleteAllReservations
}
```

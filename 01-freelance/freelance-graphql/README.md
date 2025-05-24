
# Projet GraphQL - Plateforme Freelance

## 1. Pourquoi GraphQL et non REST / SOAP ?

GraphQL a été choisi dans ce projet pour plusieurs raisons :

* **Souplesse des requêtes** : le client peut demander exactement les données dont il a besoin (ex : uniquement nom et email), ce qui évite la surcharge des réponses comme dans REST.
* **Moins d'appels** : une seule requête GraphQL peut récupérer plusieurs ressources liées (contrairement à REST où il faut souvent plusieurs appels).
* **Évolution facile** : on peut ajouter de nouveaux champs sans casser les anciens clients.

>  **GraphQL est plus moderne, flexible et optimisé pour les interfaces dynamiques** (ex : SPAs ou applications mobiles) par contre **SOAP** est lourd, verbeux, et trop complexe pour les applications simples .

---

## 2. Description du schéma GraphQL (endpoints)

### Requêtes (Queries) :

## * `freelances` : retourne tous les freelances

* `freelance(id: ID)` : retourne un freelance par son ID
* `freelanceById(id: ID!)` : identique à `freelance `mais avec ID obligatoire

### Mutations :

* `addFreelance()` : ajoute un freelance
* `updateFreelance(id: ID!, ...)` : modifie un freelance
* `deleteFreelance(id: ID!)` : supprime un freelance par ID
* `deleteAllFreelances` : supprime tous les freelances

---

## 3.exécuter et tester le projet

### Étapes :

1. Cloner le projet : `git clone ..`
2. Installer les dépendances : `npm install`
3. Lancer le serveur : `npm start`
4. Ouvrir GraphiQL dans le navigateur : [http://localhost:4000/graphql](http://localhost:4000/graphql)
5. Écrire des requêtes dans l’interface graphique (voir exemples dans le README)

---

## 4. Utilité de chaque fichier

| Fichier                         | Rôle                                                                                                             |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `server.js`                   | Point d’entrée du projet. Configure Express et démarre l’API GraphQL.                                         |
| `config/conexion.js`          | Gère la connexion à MongoDB avec Mongoose                                                                       |
| `models/Freelance.js`         | Décrit le modèle de données Freelance (schéma MongoDB). Indispensable pour interagir avec la base.            |
| `schema/schema.js`            | Contient la définition des types, queries et mutations GraphQL en JavaScript. Obligatoire pour exécuter l’API. |
| `<span>schema.graphql</span>` | Schéma en version texte (SDL) – pour documentation uniquement.                                                  |
| `package.json`                | Fichier Node.js qui gère les dépendances et les scripts (`npm start`).                                        |
| `package-lock.json`           | Version exacte des dépendances. Généré automatiquement par npm.                                               |

### Pourquoi `j'ajoute models/Freelance.js`  ?

Parce qu’il permet de **structurer et valider les données** envoyées à MongoDB. Sans ce modèle, les données seraient en vrac.

### Et si on ne veut pas utiliser MongoDB ?

On pourrait remplacer Mongoose par :

* `Sequelize` avec une base SQL (PostgreSQL, MySQL…)
* Ou simplement garder les données **en mémoire** (non persistant, pas adapté aux vraies applis)

---

## 5. Différence entre `schema.js` et `schema.graphql`

| Critère                | `schema.js`                       | `schema.graphql`                     |
| ----------------------- | ----------------------------------- | -------------------------------------- |
| Format                  | JavaScript                          | SDL (Schema Definition Language)       |
| Utilisé par le serveur | Oui                                 | Non                                    |
| Contient les resolvers  | Oui (logique de traitement MongoDB) | Non                                    |
| Utilisé pour           | Exécution réelle de l’API        | Documentation, rapport, outils Apollo  |
| Peut être supprimé ?  | Non                                 | Oui (optionnel pour la doc uniquement) |

> En clair : `schema.js` est **obligatoire**, `schema.graphql` est **optionnel mais utile pour comprendre rapidement le schéma**.
>

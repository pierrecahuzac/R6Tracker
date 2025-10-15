# Dictionnaire de Données - R6Tracker

## Vue d'ensemble
Ce dictionnaire de données décrit la structure de la base de données du projet R6Tracker, basée sur le schéma Prisma. Le système permet de tracker les parties de Rainbow Six Siege avec des détails sur les joueurs, les cartes, les opérateurs, et les statistiques de jeu.

## Entités Principales

### 1. Platform (Plateforme)
**Description :** Représente les différentes plateformes de jeu (PC, PlayStation, Xbox, etc.)

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique de la plateforme |
| name | String | UNIQUE, NOT NULL | Nom de la plateforme (ex: "PC", "PlayStation 5") |
| games | Game[] | Relation 1:N | Liste des parties jouées sur cette plateforme |
| accounts | PlayerAccount[] | Relation 1:N | Comptes joueurs sur cette plateforme |

### 2. Side (Côté)
**Description :** Représente les côtés dans Rainbow Six Siege (Attaquant/Défenseur)

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique du côté |
| name | String | UNIQUE, NOT NULL | Nom du côté (ex: "attacker", "defender") |
| label | String | NOT NULL | Libellé affiché (ex: "Attaquant", "Défenseur") |
| operators | Operator[] | Relation 1:N | Opérateurs appartenant à ce côté |
| roundsSide | Round[] | Relation 1:N | Rounds où le joueur était de ce côté |
| roundsWin | Round[] | Relation 1:N | Rounds gagnés par ce côté |

### 3. GameMode (Mode de Jeu)
**Description :** Représente les différents modes de jeu disponibles

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique du mode |
| name | String | UNIQUE, NOT NULL | Nom du mode (ex: "ranked", "casual", "unranked") |
| games | Game[] | Relation 1:N | Parties jouées dans ce mode |

### 4. Result (Résultat)
**Description :** Représente les résultats possibles d'une partie

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique du résultat |
| name | String | UNIQUE, NOT NULL | Nom du résultat (ex: "win", "loss", "draw") |
| label | String | NOT NULL | Libellé affiché (ex: "Victoire", "Défaite", "Égalité") |
| games | Game[] | Relation 1:N | Parties avec ce résultat |

### 5. Player (Joueur)
**Description :** Représente un utilisateur du système

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique du joueur |
| createdAt | DateTime | NOT NULL, Auto-généré | Date de création du compte |
| email | String | UNIQUE, NOT NULL | Adresse email du joueur |
| username | String | NOT NULL | Nom d'utilisateur |
| password | String | NOT NULL | Mot de passe (hashé) |
| accounts | PlayerAccount[] | Relation 1:N | Comptes de jeu du joueur |
| games | Game[] | Relation 1:N | Parties jouées par ce joueur |

### 6. PlayerAccount (Compte Joueur)
**Description :** Représente un compte de jeu sur une plateforme spécifique

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique du compte |
| player | Player | FK, NOT NULL | Joueur propriétaire du compte |
| playerId | String | FK, NOT NULL | ID du joueur |
| platform | Platform | FK, NOT NULL | Plateforme du compte |
| platformId | String | FK, NOT NULL | ID de la plateforme |
| gamertag | String | NOT NULL | Nom de jeu sur la plateforme |
| externalId | String | NULLABLE | ID externe (ex: Uplay ID) |
| games | Game[] | Relation 1:N | Parties jouées avec ce compte |

**Contraintes :**
- UNIQUE(playerId, platformId) : Un joueur ne peut avoir qu'un compte par plateforme
- INDEX(platformId, gamertag) : Index pour recherche rapide par plateforme et gamertag

### 7. Map (Carte)
**Description :** Représente les cartes de jeu disponibles

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique de la carte |
| name | String | UNIQUE, NOT NULL | Nom de la carte (ex: "Bank", "Oregon") |
| games | Game[] | Relation 1:N | Parties jouées sur cette carte |

### 8. Operator (Opérateur)
**Description :** Représente les opérateurs de Rainbow Six Siege

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique de l'opérateur |
| name | String | UNIQUE, NOT NULL | Nom de l'opérateur (ex: "Ash", "Thermite") |
| side | Side | FK, NOT NULL | Côté de l'opérateur |
| sideId | String | FK, NOT NULL | ID du côté |
| image | String | NULLABLE | URL de l'image de l'opérateur |
| icon | String | NOT NULL | URL de l'icône de l'opérateur |
| rounds | Round[] | Relation 1:N | Rounds joués avec cet opérateur |

### 9. Game (Partie)
**Description :** Représente une partie de Rainbow Six Siege

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique de la partie |
| createdAt | DateTime | NOT NULL, Auto-généré | Date de création de l'enregistrement |
| updatedAt | DateTime | NOT NULL, Auto-généré | Date de dernière modification |
| date | DateTime | NULLABLE | Date/heure de la partie |
| player | Player | FK, NULLABLE | Joueur qui a joué la partie |
| playerId | String | FK, NULLABLE | ID du joueur |
| map | Map | FK, NULLABLE | Carte jouée |
| mapId | String | FK, NULLABLE | ID de la carte |
| mode | GameMode | FK, NULLABLE | Mode de jeu |
| modeId | String | FK, NULLABLE | ID du mode |
| platform | Platform | FK, NULLABLE | Plateforme utilisée |
| platformId | String | FK, NULLABLE | ID de la plateforme |
| account | PlayerAccount | FK, NULLABLE | Compte utilisé |
| accountId | String | FK, NULLABLE | ID du compte |
| playerScore | Int | NULLABLE, DEFAULT 0 | Score du joueur |
| opponentScore | Int | NULLABLE, DEFAULT 0 | Score de l'équipe adverse |
| result | Result | FK, NULLABLE | Résultat de la partie |
| resultId | String | FK, NULLABLE | ID du résultat |
| overtime | Boolean | NULLABLE, DEFAULT false | Indique si la partie s'est terminée en prolongation |
| rounds | Round[] | Relation 1:N | Rounds de la partie |

**Index :**
- INDEX(playerId) : Recherche par joueur
- INDEX(mapId) : Recherche par carte
- INDEX(modeId) : Recherche par mode
- INDEX(platformId) : Recherche par plateforme
- INDEX(date) : Recherche par date

### 10. Round (Round)
**Description :** Représente un round individuel dans une partie

| Attribut | Type | Contraintes | Description |
|----------|------|-------------|-------------|
| id | String | PK, UUID, Auto-généré | Identifiant unique du round |
| createdAt | DateTime | NOT NULL, Auto-généré | Date de création de l'enregistrement |
| game | Game | FK, NOT NULL | Partie à laquelle appartient le round |
| gameId | String | FK, NOT NULL | ID de la partie |
| roundNumber | Int | NOT NULL | Numéro du round dans la partie |
| side | Side | FK, NOT NULL | Côté joué par le joueur |
| sideId | String | FK, NOT NULL | ID du côté |
| winningSide | Side | FK, NOT NULL | Côté gagnant du round |
| winningSideId | String | FK, NOT NULL | ID du côté gagnant |
| operator | Operator | FK, NULLABLE | Opérateur utilisé |
| operatorId | String | FK, NULLABLE | ID de l'opérateur |
| kills | Int | NOT NULL, DEFAULT 0 | Nombre d'éliminations |
| death | Boolean | NOT NULL, DEFAULT false | Indique si le joueur est mort |
| assists | Int | NOT NULL, DEFAULT 0 | Nombre d'assistances |
| disconnected | Boolean | NOT NULL, DEFAULT false | Indique si le joueur s'est déconnecté |
| points | Int | NOT NULL, DEFAULT 0 | Points obtenus dans le round |

**Contraintes :**
- UNIQUE(gameId, roundNumber) : Un round ne peut être dupliqué dans une même partie
- INDEX(gameId) : Recherche rapide par partie

## Relations Principales

### Relations 1:N (One-to-Many)
- Platform → Game (une plateforme peut avoir plusieurs parties)
- Platform → PlayerAccount (une plateforme peut avoir plusieurs comptes)
- Side → Operator (un côté peut avoir plusieurs opérateurs)
- Side → Round (un côté peut être joué dans plusieurs rounds)
- GameMode → Game (un mode peut avoir plusieurs parties)
- Result → Game (un résultat peut s'appliquer à plusieurs parties)
- Player → PlayerAccount (un joueur peut avoir plusieurs comptes)
- Player → Game (un joueur peut jouer plusieurs parties)
- Map → Game (une carte peut être jouée dans plusieurs parties)
- Operator → Round (un opérateur peut être utilisé dans plusieurs rounds)
- Game → Round (une partie peut avoir plusieurs rounds)

### Relations N:1 (Many-to-One)
- PlayerAccount → Player (plusieurs comptes appartiennent à un joueur)
- PlayerAccount → Platform (plusieurs comptes appartiennent à une plateforme)
- Game → Player (plusieurs parties peuvent appartenir à un joueur)
- Game → Map (plusieurs parties peuvent être jouées sur une carte)
- Game → GameMode (plusieurs parties peuvent utiliser un mode)
- Game → Platform (plusieurs parties peuvent être jouées sur une plateforme)
- Game → PlayerAccount (plusieurs parties peuvent utiliser un compte)
- Game → Result (plusieurs parties peuvent avoir le même résultat)
- Round → Game (plusieurs rounds appartiennent à une partie)
- Round → Side (plusieurs rounds peuvent être joués d'un côté)
- Round → Operator (plusieurs rounds peuvent utiliser un opérateur)

## Contraintes d'Intégrité

### Contraintes de Clé Primaire
- Toutes les entités ont un identifiant unique (UUID) auto-généré

### Contraintes de Clé Étrangère
- Toutes les relations sont maintenues par des clés étrangères
- Les suppressions en cascade ne sont pas définies (à gérer au niveau applicatif)

### Contraintes d'Unicité
- Platform.name : Nom de plateforme unique
- Side.name : Nom de côté unique
- GameMode.name : Nom de mode unique
- Result.name : Nom de résultat unique
- Player.email : Email unique par joueur
- Map.name : Nom de carte unique
- Operator.name : Nom d'opérateur unique
- PlayerAccount(playerId, platformId) : Un joueur ne peut avoir qu'un compte par plateforme
- Round(gameId, roundNumber) : Un round ne peut être dupliqué dans une même partie

### Index de Performance
- PlayerAccount(platformId, gamertag) : Recherche rapide par plateforme et gamertag
- Game(playerId, mapId, modeId, platformId, date) : Recherches fréquentes par ces critères
- Round(gameId) : Recherche rapide des rounds d'une partie

## Types de Données Utilisés

- **String** : Texte (UUID, noms, descriptions)
- **DateTime** : Dates et heures
- **Int** : Nombres entiers (scores, compteurs)
- **Boolean** : Valeurs booléennes (true/false)
- **UUID** : Identifiants uniques universels (format string)

## Notes Techniques

- **Base de données** : PostgreSQL
- **ORM** : Prisma
- **Génération d'ID** : UUID v4
- **Timestamps** : createdAt et updatedAt automatiques pour Game
- **Valeurs par défaut** : Plusieurs champs ont des valeurs par défaut (0 pour les scores, false pour les booléens)
- **Nullable** : Certains champs sont optionnels pour permettre la flexibilité (ex: date de partie, opérateur utilisé)

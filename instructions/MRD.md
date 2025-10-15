# MRD - Modèle Relationnel de Données - R6Tracker

## Vue d'ensemble
Le Modèle Relationnel de Données (MRD) représente la structure des tables et leurs relations dans la base de données PostgreSQL du projet R6Tracker.

## Tables et Relations

### 1. Platform
```
Platform (id, name)
├── PK: id (UUID)
├── UK: name
└── Relations:
    ├── 1:N → Game (platformId)
    └── 1:N → PlayerAccount (platformId)
```

### 2. Side
```
Side (id, name, label)
├── PK: id (UUID)
├── UK: name
└── Relations:
    ├── 1:N → Operator (sideId)
    ├── 1:N → Round (sideId) [RoundSide]
    └── 1:N → Round (winningSideId) [RoundWinningSide]
```

### 3. GameMode
```
GameMode (id, name)
├── PK: id (UUID)
├── UK: name
└── Relations:
    └── 1:N → Game (modeId)
```

### 4. Result
```
Result (id, name, label)
├── PK: id (UUID)
├── UK: name
└── Relations:
    └── 1:N → Game (resultId)
```

### 5. Player
```
Player (id, createdAt, email, username, password)
├── PK: id (UUID)
├── UK: email
└── Relations:
    ├── 1:N → PlayerAccount (playerId)
    └── 1:N → Game (playerId)
```

### 6. PlayerAccount
```
PlayerAccount (id, playerId, platformId, gamertag, externalId)
├── PK: id (UUID)
├── FK: playerId → Player(id)
├── FK: platformId → Platform(id)
├── UK: (playerId, platformId)
├── INDEX: (platformId, gamertag)
└── Relations:
    └── 1:N → Game (accountId)
```

### 7. Map
```
Map (id, name)
├── PK: id (UUID)
├── UK: name
└── Relations:
    └── 1:N → Game (mapId)
```

### 8. Operator
```
Operator (id, name, sideId, image, icon)
├── PK: id (UUID)
├── FK: sideId → Side(id)
├── UK: name
└── Relations:
    └── 1:N → Round (operatorId)
```

### 9. Game
```
Game (id, createdAt, updatedAt, date, playerId, mapId, modeId, platformId, accountId, playerScore, opponentScore, resultId, overtime)
├── PK: id (UUID)
├── FK: playerId → Player(id)
├── FK: mapId → Map(id)
├── FK: modeId → GameMode(id)
├── FK: platformId → Platform(id)
├── FK: accountId → PlayerAccount(id)
├── FK: resultId → Result(id)
├── INDEX: playerId
├── INDEX: mapId
├── INDEX: modeId
├── INDEX: platformId
├── INDEX: date
└── Relations:
    └── 1:N → Round (gameId)
```

### 10. Round
```
Round (id, createdAt, gameId, roundNumber, sideId, winningSideId, operatorId, kills, death, assists, disconnected, points)
├── PK: id (UUID)
├── FK: gameId → Game(id)
├── FK: sideId → Side(id) [RoundSide]
├── FK: winningSideId → Side(id) [RoundWinningSide]
├── FK: operatorId → Operator(id)
├── UK: (gameId, roundNumber)
├── INDEX: gameId
└── Relations: Aucune (table terminale)
```

## Cardinalités des Relations

### Relations 1:N (One-to-Many)
- Platform (1) → Game (N)
- Platform (1) → PlayerAccount (N)
- Side (1) → Operator (N)
- Side (1) → Round (N) [RoundSide]
- Side (1) → Round (N) [RoundWinningSide]
- GameMode (1) → Game (N)
- Result (1) → Game (N)
- Player (1) → PlayerAccount (N)
- Player (1) → Game (N)
- Map (1) → Game (N)
- Operator (1) → Round (N)
- Game (1) → Round (N)

### Relations N:1 (Many-to-One)
- PlayerAccount (N) → Player (1)
- PlayerAccount (N) → Platform (1)
- Game (N) → Player (1)
- Game (N) → Map (1)
- Game (N) → GameMode (1)
- Game (N) → Platform (1)
- Game (N) → PlayerAccount (1)
- Game (N) → Result (1)
- Round (N) → Game (1)
- Round (N) → Side (1) [RoundSide]
- Round (N) → Side (1) [RoundWinningSide]
- Round (N) → Operator (1)

## Contraintes d'Intégrité

### Contraintes de Clé Primaire
- Toutes les tables ont une clé primaire `id` de type UUID

### Contraintes de Clé Étrangère
- Toutes les relations sont maintenues par des clés étrangères
- Les clés étrangères référencent les clés primaires des tables parentes

### Contraintes d'Unicité
- Platform.name : Nom de plateforme unique
- Side.name : Nom de side unique (attaque/défense)
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

## Types de Données

| Type Prisma | Type PostgreSQL | Description |
|-------------|-----------------|-------------|
| String | VARCHAR/TEXT | Texte |
| DateTime | TIMESTAMP | Date et heure |
| Int | INTEGER | Nombre entier |
| Boolean | BOOLEAN | Valeur booléenne |
| UUID | UUID | Identifiant unique universel |

## Règles de Nommage

- **Tables** : Noms en MAJUSCULES, séparés par des underscores
- **Colonnes** : Noms en camelCase pour les clés étrangères, snake_case pour les autres
- **Clés primaires** : Toujours nommées `id`
- **Clés étrangères** : Nom de la table référencée + "Id" (ex: `playerId`, `platformId`)
- **Contraintes d'unicité** : Préfixe "UK_" + nom de la colonne
- **Index** : Préfixe "IDX_" + nom de la colonne

## Optimisations

### Index Composés
- `PlayerAccount(platformId, gamertag)` : Pour les recherches par plateforme et gamertag
- `Round(gameId, roundNumber)` : Pour l'unicité et les recherches par partie

### Index Simples
- `Game(playerId)` : Recherches par joueur
- `Game(mapId)` : Recherches par carte
- `Game(modeId)` : Recherches par mode
- `Game(platformId)` : Recherches par plateforme
- `Game(date)` : Recherches par date
- `Round(gameId)` : Recherches des rounds d'une partie

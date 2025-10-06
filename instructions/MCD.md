# MCD - Modèle Conceptuel de Données - R6Tracker

## Vue d'ensemble
Le Modèle Conceptuel de Données (MCD) représente la structure conceptuelle des données du projet R6Tracker, indépendamment de l'implémentation technique. Il décrit les entités, leurs attributs et leurs relations du point de vue métier.

## Entités et Attributs

### 🎮 PLATEFORME
**Description :** Représente les différentes plateformes de jeu disponibles

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Nom :** `name` (Texte, Unique)
- **Relations :** Contient des parties, Contient des comptes joueurs

---

### ⚔️ CAMP
**Description :** Représente les camps dans Rainbow Six Siege (Attaque/Défense)

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Nom :** `name` (Texte, Unique)
- **Libellé :** `label` (Texte, Affichage)
- **Relations :** Contient des opérateurs, Joué dans des rounds, Gagne des rounds

---

### 🎯 MODE_DE_JEU
**Description :** Représente les différents modes de jeu disponibles

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Nom :** `name` (Texte, Unique)
- **Relations :** Contient des parties

---

### 🏆 RÉSULTAT
**Description :** Représente les résultats possibles d'une partie

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Nom :** `name` (Texte, Unique)
- **Libellé :** `label` (Texte, Affichage)
- **Relations :** Appliqué à des parties

---

### 👤 JOUEUR
**Description :** Représente un utilisateur du système de tracking

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Date de création :** `createdAt` (Date/Heure)
- **Email :** `email` (Texte, Unique)
- **Nom d'utilisateur :** `username` (Texte)
- **Mot de passe :** `password` (Texte, Sécurisé)
- **Relations :** Possède des comptes, Joue des parties

---

### 🎮 COMPTE_JOUEUR
**Description :** Représente un compte de jeu sur une plateforme spécifique

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Gamertag :** `gamertag` (Texte)
- **ID Externe :** `externalId` (Texte, Optionnel)
- **Relations :** Appartient à un joueur, Appartient à une plateforme, Utilisé dans des parties

---

### 🗺️ CARTE
**Description :** Représente les cartes de jeu disponibles

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Nom :** `name` (Texte, Unique)
- **Relations :** Contient des parties

---

### 🛡️ OPÉRATEUR
**Description :** Représente les opérateurs de Rainbow Six Siege

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Nom :** `name` (Texte, Unique)
- **Image :** `image` (URL, Optionnel)
- **Icône :** `icon` (URL)
- **Relations :** Appartient à un camp, Utilisé dans des rounds

---

### 🎮 PARTIE
**Description :** Représente une partie de Rainbow Six Siege

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Date de création :** `createdAt` (Date/Heure)
- **Date de modification :** `updatedAt` (Date/Heure)
- **Date de partie :** `date` (Date/Heure, Optionnel)
- **Score joueur :** `playerScore` (Entier, Défaut: 0)
- **Score adverse :** `opponentScore` (Entier, Défaut: 0)
- **Prolongation :** `overtime` (Booléen, Défaut: false)
- **Relations :** Jouée par un joueur, Jouée sur une carte, Dans un mode, Sur une plateforme, Avec un compte, A un résultat, Contient des rounds

---

### 🔄 ROUND
**Description :** Représente un round individuel dans une partie

**Attributs :**
- **Identifiant :** `id` (UUID)
- **Date de création :** `createdAt` (Date/Heure)
- **Numéro de round :** `roundNumber` (Entier)
- **Éliminations :** `kills` (Entier, Défaut: 0)
- **Mort :** `death` (Booléen, Défaut: false)
- **Assistances :** `assists` (Entier, Défaut: 0)
- **Déconnexion :** `disconnected` (Booléen, Défaut: false)
- **Points :** `points` (Entier, Défaut: 0)
- **Relations :** Appartient à une partie, Camp joué, Camp gagnant, Opérateur utilisé

## Relations Conceptuelles

### Relations 1:N (Un vers Plusieurs)

#### PLATEFORME
- **Contient** → PARTIE (1:N)
- **Héberge** → COMPTE_JOUEUR (1:N)

#### CAMP
- **Contient** → OPÉRATEUR (1:N)
- **Joué dans** → ROUND (1:N) [Camp joué]
- **Gagne** → ROUND (1:N) [Camp gagnant]

#### MODE_DE_JEU
- **Contient** → PARTIE (1:N)

#### RÉSULTAT
- **Appliqué à** → PARTIE (1:N)

#### JOUEUR
- **Possède** → COMPTE_JOUEUR (1:N)
- **Joue** → PARTIE (1:N)

#### CARTE
- **Contient** → PARTIE (1:N)

#### OPÉRATEUR
- **Utilisé dans** → ROUND (1:N)

#### PARTIE
- **Contient** → ROUND (1:N)

### Relations N:1 (Plusieurs vers Un)

#### COMPTE_JOUEUR
- **Appartient à** → JOUEUR (N:1)
- **Sur** → PLATEFORME (N:1)

#### PARTIE
- **Jouée par** → JOUEUR (N:1)
- **Sur** → CARTE (N:1)
- **Dans** → MODE_DE_JEU (N:1)
- **Sur** → PLATEFORME (N:1)
- **Avec** → COMPTE_JOUEUR (N:1)
- **A** → RÉSULTAT (N:1)

#### ROUND
- **Appartient à** → PARTIE (N:1)
- **Camp joué** → CAMP (N:1)
- **Camp gagnant** → CAMP (N:1)
- **Avec** → OPÉRATEUR (N:1)

#### OPÉRATEUR
- **Appartient à** → CAMP (N:1)

## Règles Métier

### Règles de Gestion des Joueurs
1. **Unicité de l'email :** Chaque joueur doit avoir un email unique
2. **Comptes multiples :** Un joueur peut avoir plusieurs comptes sur différentes plateformes
3. **Unicité par plateforme :** Un joueur ne peut avoir qu'un seul compte par plateforme

### Règles de Gestion des Parties
1. **Traçabilité :** Chaque partie doit être associée à un joueur
2. **Plateforme cohérente :** La plateforme de la partie doit correspondre à celle du compte utilisé
3. **Résultat obligatoire :** Chaque partie doit avoir un résultat défini

### Règles de Gestion des Rounds
1. **Unicité dans une partie :** Un numéro de round ne peut être dupliqué dans une même partie
2. **Camp cohérent :** Le camp joué et le camp gagnant doivent être des camps valides
3. **Opérateur optionnel :** Un round peut être joué sans opérateur spécifique

### Règles de Validation des Données
1. **Scores positifs :** Les scores ne peuvent pas être négatifs
2. **Dates cohérentes :** La date de partie ne peut pas être dans le futur
3. **Gamertag unique :** Sur une même plateforme, un gamertag doit être unique

## Cardinalités Détaillées

### Relations avec Cardinalités Spécifiques

#### JOUEUR ↔ COMPTE_JOUEUR
- **Cardinalité :** 1:N
- **Contrainte :** Un joueur peut avoir 0 à N comptes
- **Contrainte :** Un compte appartient à exactement 1 joueur

#### JOUEUR ↔ PARTIE
- **Cardinalité :** 1:N
- **Contrainte :** Un joueur peut jouer 0 à N parties
- **Contrainte :** Une partie est jouée par 0 ou 1 joueur (optionnel pour flexibilité)

#### PARTIE ↔ ROUND
- **Cardinalité :** 1:N
- **Contrainte :** Une partie contient 1 à N rounds
- **Contrainte :** Un round appartient à exactement 1 partie

#### CAMP ↔ ROUND (Camp joué)
- **Cardinalité :** 1:N
- **Contrainte :** Un camp peut être joué dans 0 à N rounds
- **Contrainte :** Un round est joué d'exactement 1 camp

#### CAMP ↔ ROUND (Camp gagnant)
- **Cardinalité :** 1:N
- **Contrainte :** Un camp peut gagner 0 à N rounds
- **Contrainte :** Un round a exactement 1 camp gagnant

## Contraintes d'Intégrité Conceptuelles

### Contraintes d'Existence
- **Joueur sans compte :** Un joueur peut exister sans compte (comptes supprimés)
- **Partie sans joueur :** Une partie peut exister sans joueur (données importées)
- **Round sans opérateur :** Un round peut exister sans opérateur spécifique

### Contraintes de Cohérence
- **Plateforme cohérente :** La plateforme d'une partie doit correspondre à celle du compte utilisé
- **Camp valide :** Les camps joué et gagnant doivent être des camps existants
- **Opérateur cohérent :** Si un opérateur est spécifié, il doit appartenir au bon camp

### Contraintes de Valeur
- **Scores non négatifs :** Tous les scores doivent être >= 0
- **Dates logiques :** Les dates de création <= dates de modification
- **Numéros de round :** Les numéros de round doivent être > 0

## Vue d'Ensemble du Modèle

```
JOUEUR (1) ──→ (N) COMPTE_JOUEUR (N) ──→ (1) PLATEFORME
    │                                        │
    │                                        │
    └──→ (N) PARTIE (N) ──→ (1) PLATEFORME ──┘
              │
              ├──→ (1) CARTE
              ├──→ (1) MODE_DE_JEU
              ├──→ (1) COMPTE_JOUEUR
              ├──→ (1) RÉSULTAT
              └──→ (N) ROUND (N) ──→ (1) CAMP [Joué]
                                   ├──→ (1) CAMP [Gagnant]
                                   └──→ (1) OPÉRATEUR (N) ──→ (1) CAMP
```

Ce modèle conceptuel reflète la logique métier du système de tracking des parties Rainbow Six Siege, en mettant l'accent sur la flexibilité et la traçabilité des données de jeu.

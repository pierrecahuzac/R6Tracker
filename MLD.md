# MLD - Modèle Logique de Données - R6Tracker

## Vue d'ensemble
Le Modèle Logique de Données (MLD) représente la structure détaillée des tables, colonnes, types de données, contraintes et index pour l'implémentation PostgreSQL du projet R6Tracker.

## Structure des Tables

### 1. PLATFORM (Plateforme)
```sql
CREATE TABLE platform (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE UNIQUE INDEX idx_platform_name ON platform(name);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `name` : VARCHAR(255), NOT NULL, UNIQUE
- `created_at` : TIMESTAMP, Défaut: CURRENT_TIMESTAMP

---

### 2. SIDE (Camp - Attaque/Défense)
```sql
CREATE TABLE side (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    label VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE UNIQUE INDEX idx_side_name ON side(name);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `name` : VARCHAR(50), NOT NULL, UNIQUE (ex: "attacker", "defender")
- `label` : VARCHAR(100), NOT NULL (ex: "Attaque", "Défense")
- `created_at` : TIMESTAMP, Défaut: CURRENT_TIMESTAMP

---

### 3. GAME_MODE (Mode de Jeu)
```sql
CREATE TABLE game_mode (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE UNIQUE INDEX idx_game_mode_name ON game_mode(name);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `name` : VARCHAR(100), NOT NULL, UNIQUE (ex: "ranked", "casual", "unranked")
- `created_at` : TIMESTAMP, Défaut: CURRENT_TIMESTAMP

---

### 4. RESULT (Résultat)
```sql
CREATE TABLE result (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL UNIQUE,
    label VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE UNIQUE INDEX idx_result_name ON result(name);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `name` : VARCHAR(50), NOT NULL, UNIQUE (ex: "win", "loss", "draw")
- `label` : VARCHAR(100), NOT NULL (ex: "Victoire", "Défaite", "Égalité")
- `created_at` : TIMESTAMP, Défaut: CURRENT_TIMESTAMP

---

### 5. PLAYER (Joueur)
```sql
CREATE TABLE player (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE UNIQUE INDEX idx_player_email ON player(email);
CREATE INDEX idx_player_username ON player(username);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `created_at` : TIMESTAMP, NOT NULL, Défaut: CURRENT_TIMESTAMP
- `email` : VARCHAR(255), NOT NULL, UNIQUE
- `username` : VARCHAR(100), NOT NULL
- `password` : VARCHAR(255), NOT NULL (hashé)
- `updated_at` : TIMESTAMP, Défaut: CURRENT_TIMESTAMP

---

### 6. PLAYER_ACCOUNT (Compte Joueur)
```sql
CREATE TABLE player_account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID NOT NULL,
    platform_id UUID NOT NULL,
    gamertag VARCHAR(100) NOT NULL,
    external_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes de clé étrangère
    CONSTRAINT fk_player_account_player 
        FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE CASCADE,
    CONSTRAINT fk_player_account_platform 
        FOREIGN KEY (platform_id) REFERENCES platform(id) ON DELETE CASCADE,
    
    -- Contraintes d'unicité
    CONSTRAINT uk_player_account_player_platform 
        UNIQUE (player_id, platform_id)
);

-- Index
CREATE UNIQUE INDEX idx_player_account_player_platform 
    ON player_account(player_id, platform_id);
CREATE INDEX idx_player_account_platform_gamertag 
    ON player_account(platform_id, gamertag);
CREATE INDEX idx_player_account_gamertag ON player_account(gamertag);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `player_id` : UUID, NOT NULL, FK → player(id)
- `platform_id` : UUID, NOT NULL, FK → platform(id)
- `gamertag` : VARCHAR(100), NOT NULL
- `external_id` : VARCHAR(255), NULLABLE
- `created_at` : TIMESTAMP, Défaut: CURRENT_TIMESTAMP

---

### 7. MAP (Carte)
```sql
CREATE TABLE map (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE UNIQUE INDEX idx_map_name ON map(name);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `name` : VARCHAR(100), NOT NULL, UNIQUE (ex: "Bank", "Oregon", "Consulate")
- `created_at` : TIMESTAMP, Défaut: CURRENT_TIMESTAMP

---

### 8. OPERATOR (Opérateur)
```sql
CREATE TABLE operator (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    side_id UUID NOT NULL,
    image VARCHAR(500),
    icon VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Contraintes de clé étrangère
    CONSTRAINT fk_operator_side 
        FOREIGN KEY (side_id) REFERENCES side(id) ON DELETE RESTRICT
);

-- Index
CREATE UNIQUE INDEX idx_operator_name ON operator(name);
CREATE INDEX idx_operator_side ON operator(side_id);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `name` : VARCHAR(100), NOT NULL, UNIQUE (ex: "Ash", "Thermite", "Jäger")
- `side_id` : UUID, NOT NULL, FK → side(id)
- `image` : VARCHAR(500), NULLABLE (URL de l'image)
- `icon` : VARCHAR(500), NOT NULL (URL de l'icône)
- `created_at` : TIMESTAMP, Défaut: CURRENT_TIMESTAMP

---

### 9. GAME (Partie)
```sql
CREATE TABLE game (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date TIMESTAMP,
    
    -- Clés étrangères
    player_id UUID,
    map_id UUID,
    mode_id UUID,
    platform_id UUID,
    account_id UUID,
    result_id UUID,
    
    -- Données de la partie
    player_score INTEGER DEFAULT 0,
    opponent_score INTEGER DEFAULT 0,
    overtime BOOLEAN DEFAULT FALSE,
    
    -- Contraintes de clé étrangère
    CONSTRAINT fk_game_player 
        FOREIGN KEY (player_id) REFERENCES player(id) ON DELETE SET NULL,
    CONSTRAINT fk_game_map 
        FOREIGN KEY (map_id) REFERENCES map(id) ON DELETE SET NULL,
    CONSTRAINT fk_game_mode 
        FOREIGN KEY (mode_id) REFERENCES game_mode(id) ON DELETE SET NULL,
    CONSTRAINT fk_game_platform 
        FOREIGN KEY (platform_id) REFERENCES platform(id) ON DELETE SET NULL,
    CONSTRAINT fk_game_account 
        FOREIGN KEY (account_id) REFERENCES player_account(id) ON DELETE SET NULL,
    CONSTRAINT fk_game_result 
        FOREIGN KEY (result_id) REFERENCES result(id) ON DELETE SET NULL,
    
    -- Contraintes de validation
    CONSTRAINT chk_game_scores_positive 
        CHECK (player_score >= 0 AND opponent_score >= 0),
    CONSTRAINT chk_game_date_not_future 
        CHECK (date IS NULL OR date <= CURRENT_TIMESTAMP)
);

-- Index
CREATE INDEX idx_game_player ON game(player_id);
CREATE INDEX idx_game_map ON game(map_id);
CREATE INDEX idx_game_mode ON game(mode_id);
CREATE INDEX idx_game_platform ON game(platform_id);
CREATE INDEX idx_game_account ON game(account_id);
CREATE INDEX idx_game_result ON game(result_id);
CREATE INDEX idx_game_date ON game(date);
CREATE INDEX idx_game_created_at ON game(created_at);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `created_at` : TIMESTAMP, NOT NULL, Défaut: CURRENT_TIMESTAMP
- `updated_at` : TIMESTAMP, NOT NULL, Défaut: CURRENT_TIMESTAMP
- `date` : TIMESTAMP, NULLABLE (Date/heure de la partie)
- `player_id` : UUID, NULLABLE, FK → player(id)
- `map_id` : UUID, NULLABLE, FK → map(id)
- `mode_id` : UUID, NULLABLE, FK → game_mode(id)
- `platform_id` : UUID, NULLABLE, FK → platform(id)
- `account_id` : UUID, NULLABLE, FK → player_account(id)
- `result_id` : UUID, NULLABLE, FK → result(id)
- `player_score` : INTEGER, NULLABLE, Défaut: 0
- `opponent_score` : INTEGER, NULLABLE, Défaut: 0
- `overtime` : BOOLEAN, NULLABLE, Défaut: FALSE

---

### 10. ROUND (Round)
```sql
CREATE TABLE round (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    game_id UUID NOT NULL,
    round_number INTEGER NOT NULL,
    side_id UUID NOT NULL,
    winning_side_id UUID NOT NULL,
    operator_id UUID,
    kills INTEGER DEFAULT 0,
    death BOOLEAN DEFAULT FALSE,
    assists INTEGER DEFAULT 0,
    disconnected BOOLEAN DEFAULT FALSE,
    points INTEGER DEFAULT 0,
    
    -- Contraintes de clé étrangère
    CONSTRAINT fk_round_game 
        FOREIGN KEY (game_id) REFERENCES game(id) ON DELETE CASCADE,
    CONSTRAINT fk_round_side 
        FOREIGN KEY (side_id) REFERENCES side(id) ON DELETE RESTRICT,
    CONSTRAINT fk_round_winning_side 
        FOREIGN KEY (winning_side_id) REFERENCES side(id) ON DELETE RESTRICT,
    CONSTRAINT fk_round_operator 
        FOREIGN KEY (operator_id) REFERENCES operator(id) ON DELETE SET NULL,
    
    -- Contraintes d'unicité
    CONSTRAINT uk_round_game_number 
        UNIQUE (game_id, round_number),
    
    -- Contraintes de validation
    CONSTRAINT chk_round_number_positive 
        CHECK (round_number > 0),
    CONSTRAINT chk_round_kills_non_negative 
        CHECK (kills >= 0),
    CONSTRAINT chk_round_assists_non_negative 
        CHECK (assists >= 0),
    CONSTRAINT chk_round_points_non_negative 
        CHECK (points >= 0)
);

-- Index
CREATE UNIQUE INDEX idx_round_game_number 
    ON round(game_id, round_number);
CREATE INDEX idx_round_game ON round(game_id);
CREATE INDEX idx_round_side ON round(side_id);
CREATE INDEX idx_round_winning_side ON round(winning_side_id);
CREATE INDEX idx_round_operator ON round(operator_id);
```

**Colonnes :**
- `id` : UUID, Clé primaire, Auto-généré
- `created_at` : TIMESTAMP, NOT NULL, Défaut: CURRENT_TIMESTAMP
- `game_id` : UUID, NOT NULL, FK → game(id)
- `round_number` : INTEGER, NOT NULL
- `side_id` : UUID, NOT NULL, FK → side(id) [Camp joué]
- `winning_side_id` : UUID, NOT NULL, FK → side(id) [Camp gagnant]
- `operator_id` : UUID, NULLABLE, FK → operator(id)
- `kills` : INTEGER, NOT NULL, Défaut: 0
- `death` : BOOLEAN, NOT NULL, Défaut: FALSE
- `assists` : INTEGER, NOT NULL, Défaut: 0
- `disconnected` : BOOLEAN, NOT NULL, Défaut: FALSE
- `points` : INTEGER, NOT NULL, Défaut: 0

## Triggers et Fonctions

### Trigger de Mise à Jour Automatique
```sql
-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour la table game
CREATE TRIGGER update_game_updated_at 
    BEFORE UPDATE ON game 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

## Vues Utiles

### Vue des Statistiques de Joueur
```sql
CREATE VIEW player_stats AS
SELECT 
    p.id,
    p.username,
    p.email,
    COUNT(DISTINCT g.id) as total_games,
    COUNT(DISTINCT pa.id) as total_accounts,
    COUNT(DISTINCT g.map_id) as maps_played,
    AVG(g.player_score) as avg_score,
    SUM(CASE WHEN r.name = 'win' THEN 1 ELSE 0 END) as wins,
    SUM(CASE WHEN r.name = 'loss' THEN 1 ELSE 0 END) as losses
FROM player p
LEFT JOIN player_account pa ON p.id = pa.player_id
LEFT JOIN game g ON p.id = g.player_id
LEFT JOIN result r ON g.result_id = r.id
GROUP BY p.id, p.username, p.email;
```

### Vue des Statistiques par Carte
```sql
CREATE VIEW map_stats AS
SELECT 
    m.id,
    m.name,
    COUNT(g.id) as games_played,
    AVG(g.player_score) as avg_player_score,
    AVG(g.opponent_score) as avg_opponent_score,
    SUM(CASE WHEN r.name = 'win' THEN 1 ELSE 0 END) as wins,
    SUM(CASE WHEN r.name = 'loss' THEN 1 ELSE 0 END) as losses
FROM map m
LEFT JOIN game g ON m.id = g.map_id
LEFT JOIN result r ON g.result_id = r.id
GROUP BY m.id, m.name;
```

## Contraintes d'Intégrité

### Contraintes de Clé Primaire
- Toutes les tables ont une clé primaire `id` de type UUID
- Génération automatique avec `gen_random_uuid()`

### Contraintes de Clé Étrangère
- **CASCADE** : Suppression en cascade pour les relations parent-enfant
- **SET NULL** : Mise à NULL pour les relations optionnelles
- **RESTRICT** : Empêche la suppression si des références existent

### Contraintes d'Unicité
- Noms uniques pour les entités de référence (platform, side, game_mode, etc.)
- Email unique pour les joueurs
- Combinaison unique (player_id, platform_id) pour les comptes joueurs
- Combinaison unique (game_id, round_number) pour les rounds

### Contraintes de Validation
- Scores non négatifs
- Numéros de round positifs
- Dates de partie dans le passé
- Valeurs par défaut appropriées

## Index de Performance

### Index Simples
- Toutes les clés étrangères sont indexées
- Colonnes fréquemment utilisées dans les WHERE clauses
- Colonnes utilisées dans les ORDER BY

### Index Composés
- `player_account(platform_id, gamertag)` : Recherche par plateforme et gamertag
- `round(game_id, round_number)` : Unicité et recherche par partie

### Index Partiels
- Possibilité d'ajouter des index partiels pour des requêtes spécifiques
- Exemple : `CREATE INDEX idx_active_games ON game(date) WHERE date IS NOT NULL;`

## Optimisations Recommandées

### Partitioning
- Considérer le partitioning de la table `game` par date pour les grandes volumétries
- Partitioning de la table `round` par `game_id` si nécessaire

### Maintenance
- VACUUM et ANALYZE réguliers
- Monitoring des performances des requêtes
- Ajustement des index selon l'usage réel

Ce modèle logique fournit une base solide pour l'implémentation PostgreSQL du système de tracking R6Tracker, avec une attention particulière aux performances et à l'intégrité des données.

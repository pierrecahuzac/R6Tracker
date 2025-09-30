-- Fichier de Schéma SQL (PostgreSQL) pour Supabase

---------------------------------------------------
-- 1. Table USERS : Statistiques globales du joueur
---------------------------------------------------
-- Contient un seul enregistrement par utilisateur (ID de l'utilisateur).


CREATE TABLE users (
    -- Clé primaire. L'ID de l'utilisateur (sera l'ID d'authentification de Supabase).
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    email VARCHAR(100) NOT NULL UNIQUE,
    -- password VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    -- Champs de statistiques globales (pour l'écran 'Stats')
    total_games INTEGER NOT NULL DEFAULT 0,
    total_kills INTEGER NOT NULL DEFAULT 0,
    total_deaths INTEGER NOT NULL DEFAULT 0,
    total_assists INTEGER NOT NULL DEFAULT 0,
    total_points INTEGER NOT NULL DEFAULT 0,
    
    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Index pour accélérer les recherches sur la dernière mise à jour
CREATE INDEX idx_users_updated ON users (last_updated);


---------------------------------------------------
-- 2. Table GAMES : Détails de chaque partie jouée
---------------------------------------------------
-- Une partie est liée à un seul utilisateur.
CREATE TABLE games (
    -- Clé primaire de la partie
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Clé étrangère vers l'utilisateur (Relation 1 à N : User a plusieurs Games)
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL, 

    -- Champs généraux de la partie
    match_date TIMESTAMP WITH TIME ZONE NOT NULL,
    map VARCHAR(100) NOT NULL,
    side_choice VARCHAR(10) NOT NULL, -- Ex: 'Attaque' ou 'Défense'
    score VARCHAR(10) NOT NULL,      -- Ex: '4 - 5'
    is_prolongation BOOLEAN NOT NULL DEFAULT FALSE,

    -- Statistiques totales de l'utilisateur pour cette partie (utile pour l'affichage rapide)
    kills INTEGER NOT NULL DEFAULT 0,
    deaths INTEGER NOT NULL DEFAULT 0,
    assists INTEGER NOT NULL DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,
    
    -- Champ ajouté lors de notre discussion
    was_disconnected BOOLEAN NOT NULL DEFAULT FALSE, 

    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Index pour accélérer la recherche des parties par utilisateur
CREATE INDEX idx_games_user_id ON games (user_id);


---------------------------------------------------
-- 3. Table ROUNDS : Détails de chaque manche
---------------------------------------------------
-- Une manche est liée à une seule partie.
CREATE TABLE rounds (
    -- Clé primaire de la manche
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Clé étrangère vers la partie (Relation 1 à N : Game a plusieurs Rounds)
    game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL, 

    -- Champs spécifiques à la manche
    round_number INTEGER NOT NULL,
    side VARCHAR(10) NOT NULL,      -- Ex: 'A' (Attaque) ou 'D' (Défense)
    score_text VARCHAR(50) NOT NULL,
    is_prolongation BOOLEAN NOT NULL DEFAULT FALSE,
    operator VARCHAR(100) NOT NULL, -- Le nom de l'opérateur choisi (un seul par manche)
    win BOOLEAN NOT NULL,           -- Vrai si l'équipe a gagné la manche

    -- Statistiques de l'utilisateur pour cette manche
    kill INTEGER NOT NULL DEFAULT 0,    -- Contrainte max 5 gérée par l'application
    death INTEGER NOT NULL DEFAULT 0,   -- Contrainte max 1 gérée par l'application
    assist INTEGER NOT NULL DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,

    -- Champ ajouté lors de notre discussion
    is_disconnected BOOLEAN NOT NULL DEFAULT FALSE,

    -- Métadonnées
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Index pour accélérer la recherche des manches par partie
CREATE INDEX idx_rounds_game_id ON rounds (game_id);

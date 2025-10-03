# R6 Stats – Tracker de performance pour Rainbow Six Siege X

R6 Stats est une application mobile (Expo/React Native) permettant de suivre et d’analyser tes performances sur Rainbow Six Siege X. L’app offre un tableau de bord, l’historique de parties, des vues par opérateur et un profil joueur. Le backend repose sur Supabase (PostgreSQL + Auth + RLS).

## Fonctionnalités (MVP)

- Tableau de bord: résumé des KPI (K/D, WR, headshots, temps de jeu)
- Historique de parties: liste, filtres, détail d’une partie
- Opérateurs: stats par opérateur, cartes, saisons
- Profil: informations joueur, plateforme(s)
- Authentification: email+mot de passe (et OAuth plus tard)

## Prérequis

- Node.js LTS, npm
- Expo CLI via `npx`
- Un projet Supabase (URL + clé Anon)

## Installation

```bash
npm install
npx expo start
```

Ouvre sur un émulateur Android/iOS, un device avec Expo Go, ou le web.

## Configuration des variables d’environnement

Expo expose les variables préfixées `EXPO_PUBLIC_` au client (mobile/web). Crée un fichier `.env` à la racine (non commité) et ajoute:

```bash
EXPO_PUBLIC_SUPABASE_URL=XXXXXXXX
EXPO_PUBLIC_SUPABASE_ANON_KEY=XXXXXXXX
```

En CI/build (EAS), renseigne ces valeurs dans les Secrets. Ne jamais utiliser la clé Service-Role côté app.

## Supabase – Configuration rapide

1. Crée un projet sur la console Supabase.
2. Récupère l’URL du projet et la clé Anon.
3. Configure les URL de redirection d’authentification:
   - Native: `r6stats://auth/callback`
   - Web (dev/prod): `https://<ton-domaine>/auth/callback`
4. Plus tard: activer RLS et écrire des policies par table.

## Deep linking et schéma d’URL

Le schéma personnalisé `r6stats` est défini dans `app.json`. Il sera utilisé pour les retours d’auth native. Sur le web, utilise l’URL publique du site.

## Scripts NPM

- `npm start`: lance Expo
- `npm run android` / `npm run ios` / `npm run web`
- `npm run lint`
- `npm run reset-project`: réinitialise le starter (optionnel)

## Structure du projet (extrait)

- `app/(tabs)/`: navigation par onglets (Home, Stats, Explore)
- `app/src/`: composants, lib, providers (à compléter)
- `components/`: composants UI partagés
- `constants/`, `hooks/`, `assets/`: ressources et utilitaires

## Roadmap (prochaine itération)

1. Installer et initialiser le client Supabase (stockage session sécurisé)
2. Concevoir le schéma: profils, parties, opérateurs, saisons, plateformes
3. Activer RLS + policies par table
4. Auth email+mdp (puis OAuth), deep linking `r6stats://auth/callback`
5. Provider de session + persistance, onboarding
6. Services data et écrans Dashboard/Stats/Profil
7. Observabilité (erreurs, journaux, retours haptiques)

## Licence

Projet privé en cours de développement.


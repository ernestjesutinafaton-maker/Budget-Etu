# Budget Étudiant

Une application web pour suivre ses dépenses d'étudiant et tenir son budget du mois.
Réalisée en **Angular** pendant ma 2<sup>e</sup> année de Bachelor Informatique à l'EPSI Lyon.

## Fonctionnalités

- **Liste des dépenses**, de la plus récente à la plus ancienne, avec un badge de couleur par catégorie :
  Alimentation, Logement, Transport, Loisirs, Études.
- **Ajout, modification, détail et suppression** d'une dépense.
- **Statistiques du mois** : total dépensé, total par catégorie, et budget mensuel avec une alerte quand il est dépassé.
- Le **budget mensuel** est mémorisé dans le navigateur (localStorage).
- Une page « introuvable » pour les adresses inconnues.

## Technologies

| Partie | Outils |
|---|---|
| Interface | Angular 22 : composants autonomes, signaux, `httpResource`, routage |
| Langage | TypeScript, RxJS |
| API simulée | json-server, avec les données de `db.json` |
| Tests | Vitest |

## Lancer le projet

```bash
npm install
npx json-server db.json --port 3000   # l'API des dépenses, sur http://localhost:3000
npm start                             # l'application, sur http://localhost:4200
```

## Tests

```bash
npm test
```

## Organisation du code

```
src/app/core/     le service des dépenses (appels à l'API, tri, budget)
src/app/pages/    les écrans : liste, ajout et modification, détail, statistiques
src/app/shared/   les composants réutilisables (carte, badge, en-tête) et les calculs
```

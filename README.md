# Planning des salles

Outil statique sans dépendance : ouvrir `index.html` dans un navigateur.

## Utilisation

- Sélectionner un professionnel dans la légende, puis cliquer sur les heures à ajouter ou retirer.
- Le tableau inférieur synthétise uniquement les cases du **Nouveau kiné**, à la demi-journée. Une seule heure suffit ; plusieurs salles sont toutes indiquées.
- L’espace gym est indiqué le lundi matin, le mercredi et le vendredi, uniquement en cas de présence au cabinet.
- Sur une demi-journée sans présence, choisir **Domiciles ou repos**, **Domiciles** ou **Repos**. Ce choix reste mémorisé lors d’un passage temporaire au cabinet.
- Chaque bouton **Imprimer / PDF** imprime uniquement le planning correspondant, sur une page A4 paysage. Choisir l’enregistrement PDF dans la fenêtre d’impression du navigateur.
- **Réinitialiser** restaure le scénario de départ partagé, avec ses salles et ses choix **Domiciles / Repos**, après confirmation.

Le scénario de départ place le nouveau kiné en salle 3 les lundi, mercredi et vendredi matin ; en salle 1 les mardi et jeudi matin ; en salle 3 le mercredi après-midi et en salle 1 le vendredi après-midi. Les lundi, mardi et jeudi après-midi sont indiqués **Domiciles**. Si la présence du mardi matin est retirée, le choix hors cabinet initialement mémorisé pour cette demi-journée est **Repos**.

Les affectations et les activités hors cabinet sont mémorisées automatiquement dans le stockage local du navigateur, sans compte ni envoi à un serveur. La sauvegarde est propre au navigateur et à l’adresse du site ; elle n’est pas partagée entre appareils. Effacer les données du site supprime la sauvegarde. Le planning reste utilisable lorsque ce stockage est bloqué, avec un avertissement.

## Données et vérifications

Les professionnels, présences initiales, salles, périodes, choix hors cabinet par défaut et règles d’accès gym sont centralisés dans `PLANNING_DATA` au début de `script.js`. Le second tableau est calculé à partir des cases cochées, sans duplication des affectations. Les essais déjà enregistrés localement restent prioritaires sur le scénario par défaut.

Les conflits de salle sont signalés dans les deux tableaux. Les modifications horaires restent libres pour permettre les essais.

Vérifier les règles de calcul et la relecture des sauvegardes sans installer de dépendance :

```sh
node --test script.test.js
```

Le site public est publié depuis `main`. Les améliorations sont préparées sur `dev` avant publication.

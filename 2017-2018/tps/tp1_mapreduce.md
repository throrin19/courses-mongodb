# MapReduce

<center>
![img](../../res/tp1.jpg)
<br>
</center>


```json
{
	"_id" : "5a5b5cb53de90e14b9f7d6f7",
	"city" : "Machias",
	"franchise" : "Disney",
	"rooms" : 15,
	"places" : 1279,
	"parking" : true,
	"annualResult" : 27852001,
	"weekResult" : 1861234,
	"year" : 1975
}
```

| field | description |
| --- | --- |
| city | Ville où le cinéma est implanté |
| franchise | Franchise du cinéma en question |
| room | nombre de salles |
| places | nombre total de places dans le cinéma |
| parking | Si le cinéma a un parking ou non |
| annualResult | Résultat du cinéma de la dernière année |
| weekResult | Résultat du cinéma de la dernière semaine |
| year | Année de construction du cinéma |

Pour pouvoir travailler deans de bonnes conditions, je vous conseille d'avoir mongoDB 3.4+ d'installé sur vos machines et de passer par un gestionnaire graphique comme mongobooster, robomongo ou mongodb compass. **Vous trouverez le contenu de la collection dans le dossier `imports`. Il s'agit du fichier `tp1.json` à importer via mongoimport.**

**Bon à savoir** : Dans le cour, j'ai oublié de préciser que les fonctions de map et de reduce doivent absolument avoir un retour structuré de la même façon pour fonctionner (fields et type). Si vous voulez transformer le résultat final différemment de votre `emit()`, vous devrez utiliser la méthode `finalize()`.

Grâce à mapReduce, réalisez les requêtes suivantes :

**Attention** : Chaque résultat sera à mettre dans une collection différente à chaque fois.

1. Listez combien il y a de cinéma par ville
2. Listez combien il y a de cinéma par franchise
3. Listez combien il y a de places de cinéma par ville
4. Listez combien il y a de salles de cinéma par franchise
5. Listes combien de cinémas ont des places de parking
6. Listez combien il y a de cinéma par ville ayant des places de parking
7. Listez, par franchise, le revenu total annuel
8. Listez, par ville le revenu total hebdomadaire
9. Listez, par ville, le revenu moyen annuel
10. Listez, par franchise, le revenu moyen hebdomadaire
11. Affichez le nombre moyen de salles par cinéma (arrondi à l'entier suppériur)
12. Affichez le revenu moyen annuel des cinémas ayant plus de salles que la moyenne (selon le résultat de la 11)
13. Affichez le revenu moyen hebdomadaire des cinémas ayant moins de salles que la moyenne (selon le résultat de la 11)
14. Pour les cinémas du groupe Disney, listez combien il y a de cinéma par année
15. Pour les cinémas du groupe CGR, listez combien il y a eu de cinéma par année durant les années 80
16. Pour les cinémas du groupe Paramount, listez combien il y a de cinéma par années durant les années 90, en ayant pour clé la franchise et l'année en question
17. Listez par année et par Franchise, le nombre de cinéma ayant plus de 4000 places après l'an 2000
18. Listez, par ville le revenu total hebdomadaire. Le résutat devra comprendre le signe `$` avant la somme (ex : `$20000`)
19. Passage en mode `reduce` :
    - Reprenez la requête de la question 7
    - Effectuez la requête pour chaque décénies (années 70, 80, ...) en  faisant un `reduce` sur la collection cible afin de retomber sur le même résultat que la question 7.

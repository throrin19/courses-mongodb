# Index et Performances

<center>
![tp2](../../res/tp2.png)
</center>

```json
{
    "_id" : "5a6dc09bf1cb750b80169080",
    "address" : {
        "street" : "9816 White Valley",
        "zipCode" : 10101.0,
        "borough" : "Bronx"
    },
    "cuisine" : "Donuts",
    "grades" : [
        {
            "year" : 2017.0,
            "grade" : "F",
            "score" : 45.0
        }
    ],
    "name" : "Danyka Spencer"
}
```

Aujourd'hui nous allons travailler sur une base de données sur les restaurant afin d'approfondire mapReduce et d'apprendre à créer les bons indexes en fonction de vos différentes requêtes.

Vous trouverez le json d'import de la base de données dans imports/tp2.json. Attention, le fichier est assez imposant et je vous déconseille de l'ouvrir avec un éditeur aux vues de son poids (270Mo) et du nombre de documents qu'elle contient (1 million de documents)

<br>

## MapReduce

1. Listez, par borough, le nombre de restaurants
2. Listez, par code postal, le nombre de restaurants par ordre décroissant (utiliser le sort)
3. Listez, par année et par grade, le nombre de restaurants
4. Listez, par année et par grade, la note moyenne des restaurants

## Requests
1. Listez les restaurants du Bronx par ordre alphabétique
2. Listez les restaurants étant soit dans le Bronx, soit dans Manhattan, préparant de la cuisine Chicken, Italian ou Pizza. Le tout trié par code postal
3. Listez les restaurant préparant de la cuisine French, Italian ou Spanish ayant eu un grade en 2015 différent de A et B. Le tout par ordre alphabétique inverse (Z-A)

## Indexes

1. Pour les requêtes précédentes, trouvez les indexes leur correspondant en utilisant la règle du ESR et en utilisant explain. Notez le temps d'exécution avant et aprés la création des indexes.
2. Créez un index de type texte pour les champs name, cuisine et borough puis faites les requêtes suivantes :
    - Affichez tous les restaurants ayant le mot French
    - Affichez tous les restaurants ayant les mots Mexican, Turner ou Bronx

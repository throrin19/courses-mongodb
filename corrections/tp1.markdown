# Correction TP1

1. Lister combien il y a d'utilisateur par site

```
db.rawData.mapReduce(
    function () {
        emit(this.website, 1);
    },
    function (key, values) {
        return Array.sum(values);
    },
    {
        out : 'q1'
    }
);
```

2. Lister combien il y a d'articles par site

```
db.rawData.mapReduce(
    function () {
        emit(this.website, this.articles.length);
    },
    function (key, values) {
        return Array.sum(values);
    },
    {
        out : 'q2'
    }
);
```

3. Lister le nombre de like moyen par site

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

```
db.rawData.mapReduce(
    function () {
        var length      = this.articles.length;
        var noteTotal   = 0;
        var i;

        for(i = 0; i < length; ++i) {
            noteTotal += this.articles[i].note;
        }

        emit(this.website, {
            size : length,
            note : noteTotal
        });
    },
    function (key, values) {
        var nbTotal = 0;
        var noteTotal = 0;
        var i;

        for(i = 0; i < values.length; ++i) {
            noteTotal =  noteTotal + values[i].note;
            nbTotal = nbTotal + values[i].size;
        }

        return {
            size : nbTotal,
            note : noteTotal
        }
    },
    {
        out : 'q3',
        finalize : function (key, reduceVal) {
            return reduceVal.note / reduceVal.size;
        }
    }
);
```

4. Lister le nombre d'articles par catégories pour le site `JV.com`

```
db.rawData.mapReduce(
    function () {
        var length      = this.articles.length;
        var i;

        for(i = 0; i < length; ++i) {
            emit(this.articles[i].category, 1);
        }
    },
    function (key, values) {
        return Array.sum(values);
    },
    {
        out : 'q4',
        query : {
            website : 'JV.com'
        }
    }
);
```

5. Lister la note moyenne par catégorie (finalize)

```
db.rawData.mapReduce(
    function () {
        var length      = this.articles.length;
        var i;

        this.articles.forEach(function (article) {
            emit(article.category, {
                count : 1,
                note : article.note
            });
        });
    },
    function (key, values) {
        var result = {
            count : 0,
            note : 0
        };

        values.forEach(function (value) {
            result.count += value.count;
            result.note += value.note;
        });

        return result;
    },
    {
        out : 'q5',
        finalize : function (key, reduceValue) {
            return reduceValue.note / reduceValue.count;
        }
    }
);
```

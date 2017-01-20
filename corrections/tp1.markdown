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

6. Lister le nombre d'articles de chaque site pour la catégorie `Vulgarisation`

```
db.rawData.mapReduce(
    function () {
        this.articles.forEach(function (article) {
            if (article.category == 'Vulgarisation') {
                emit(this.website, 1);
            }
        }, this);
    },
    function (key, values) {
        var total = 0;

        values.forEach(function (value) {
            total += value
        });

        return total;
    },
    {
        out : 'q6'
    }
);
```

7. Lister le nombre d'articles postés par année

```
db.rawData.mapReduce(
    function () {
        var length      = this.articles.length;
        var i;

        for(i = 0; i < length; ++i) {
            emit(this.articles[i].date.getFullYear(), 1);
        }
    },
    function (key, values) {
        return Array.sum(values);
    },
    {
        out : 'q7'
    }
);
```

9. Lister, par site, combien d'articles il y a dans chaque catégorie

```
db.rawData.mapReduce(
    function () {
        var result = {};

        this.articles.forEach(function (article) {
            if (!result[article.category]) {
                result[article.category] = 1;
            } else {
                result[article.category] += 1;
            }
        });

        emit(this.website, result);
    },
    function (key, values) {
        var result = {};

        values.forEach(function (value) {
            var keys = Object.keys(value);

            keys.forEach(function (key) {
                if (!result[key]) {
                    result[key] = value[key];
                } else {
                    result[key] += value[key];
                }
            });
        });    

        return result;
    },
    {
        out : 'q8'
    }
);
```

10. Lister, par site, et par catégories, combien il y a d'articles chaque année

```
db.rawData.mapReduce(
    function () {
        var result = {};

        this.articles.forEach(function (article) {
            if (!result[article.category]) {
                result[article.category] = {};

                result[article.category][article.date.getFullYear()] = 1
            } else if (!result[article.category][article.date.getFullYear()]) {
                result[article.category][article.date.getFullYear()] = 1;
            } else {
                result[article.category][article.date.getFullYear()] += 1;
            }
        });

        emit(this.website, result);
    },
    function (key, values) {
        var result = {};

        values.forEach(function (value) {
            var keys = Object.keys(value);

            keys.forEach(function (key) {
                var dates = Object.keys(value[key]);

                dates.forEach(function (d) {
                    if (!result[key]) {
                        result[key] = {};
                        result[key][d] = value[key][d];
                    } else if (!result[key][d]) {
                        result[key][d] = value[key][d];
                    } else {
                        result[key][d] += value[key][d];
                    }
                });
            });
        });    

        return result;
    },
    {
        out : 'q10b'
    }
);
```

11. Lister pour chaque site quels sont les 5 articles les plus récents.

```
db.rawData.mapReduce(
    function () {
        emit(this.website, {
            articles : this.articles
        });
    },
    function (key, values) {
        var allArticles = [];

        values.forEach(function (v) {
            allArticles = allArticles.concat(v.articles);
        });

        allArticles = allArticles.sort(function (a, b) {
            return b.date.getTime() - a.date.getTime();
        });

        return { articles : allArticles.slice(0, 5) };
    },
    {
        out : 'q11'
    }
);
```

12. Lister, pour chaque catégorie quels sont les 5 articles les mieux notés de 2017 par ordre alphabétique.

```

```

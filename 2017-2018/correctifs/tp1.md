# TP1 : Corrections

1. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.city, 1);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question1'
    } 
)
```

2. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.franchise, 1);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question2'
    }
)
```

3. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.city, this.places);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question3'
    }
)
```

4. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.franchise, this.rooms);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question4'
    }
)
```

5. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit('total', 1);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question2',
        query : {
            parking : true
        }
    }
)
```

6. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.city, 1);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question2',
        query : {
            parking : true
        }
    }
)
```

7. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.franchise, this.annualResult);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question2'
    }
)
```

8. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.franchise, this.weekResult);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question2'
    }
)
```

9. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.city, this.annualResult);
    },
    function reduce(key, values) {
        return Array.avg(values)
    },
    {
        out : 'question2'
    }
)
```

10. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.franchise, this.weekResult);
    },
    function reduce(key, values) {
        return Array.avg(values)
    },
    {
        out : 'question2'
    }
)
```

11. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit('salles', this.rooms)
    },
    function reduce(key, values) {
        return Math.round(Array.avg(values));
    },
    {
        out : 'question11'
    }
)
```

12. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit('total', this.annualResult)
    },
    function reduce(key, values) {
        return Math.round(Array.avg(values));
    },
    {
        out : 'question11',
        query : {
            rooms : {
                $gt : 8
            }    
        }
    }
)
```

13. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit('total', this.weekResult)
    },
    function reduce(key, values) {
        return Math.round(Array.avg(values));
    },
    {
        out : 'question11',
        query : {
            rooms : {
                $lt : 8
            }    
        }
    }
)
```

14. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.year, 1);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question14',
        query : {
            franchise : 'Disney'
        }
    }
)
```

15. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.year, 1);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question15',
        query : {
            franchise : 'CGR',
            year : {
                $gte : 1980,
                $lt : 1990
            }
        }
    }
)
```

16. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.franchise + ' ' + this.year, 1);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question16',
        query : {
            franchise : 'Paramount',
            year : {
                $gte : 1990,
                $lt : 2000
            }
        }
    }
)
```

17. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.franchise + ' ' + this.year, 1);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question17',
        query : {
            places : {
                $gt : 4000,
            }
            year : {
                $gte : 2000,
                $lt : 2010
            }
        }
    }
)
```

18. ```javascript
db.cinemas.mapReduce(
    function map() {
        emit(this.franchise, this.weekResult);
    },
    function reduce(key, values) {
        return Array.sum(values)
    },
    {
        out : 'question18',
        finalize : function (key, value) {
            return '$' + value;
        },
    }
)
```

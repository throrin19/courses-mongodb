1.

```javascript
db.restaurans.mapReduce(
    function map() {
        emit(this.address.borough, 1)
    },
    function reduce(key, values) {
        return Array.sum(values);
    },
    {
        out : 'question1'
    }
)
```

2.

```javascript
db.restaurans.mapReduce(
    function map() {
        emit(this.address.zipCode, 1)
    },
    function reduce(key, values) {
        return Array.sum(values);
    },
    {
        out : 'question2'
    }
)

db.restaurans.find().sort({ value : -1 });
```

3.

```javascript
db.restaurans.mapReduce(
    function map() {
        this.grades.forEach(function (grade) {
            emit(grade.year + ' ' + grade.grade, 1);
        });
    },
    function reduce(key, values) {
        return Array.sum(values);
    },
    {
        out : 'question3'
    }
)
```

4.

```javascript
db.restaurans.mapReduce(
    function map() {
        this.grades.forEach(function (grade) {
            emit(grade.year + ' ' + grade.grade, grade.score);
        });
    },
    function reduce(key, values) {
        return Array.avg(values);
    },
    {
        out : 'question4'
    }
)
```

5. 1.042 / 0.012

```javascript
db.restaurans.find({
    'address.borough' : 'Bronx'
}).sort({ name : 1 })
```

6. 1.087 / 0.011

```javascript
db.restaurans.find({
    'address.borough' : { $in : ['Bronx', 'Manhattan'] },
    cuisine : { $in : ['Chicken', 'Italian', 'Pizza'] }
}).sort({ 'address.zipCode' : 1 })
```

7. 1.755 / 0.379

```javascript
db.restaurans.find({
    cuisine : { $in : ['French', 'Italian', 'Spanish'] },
    'grades.year' : 2015,
    'grades.grade' : { $nin : ['A', 'B'] }
}).sort({ name : -1 })
```

Bonus : 0.161 / 0.017

```javascript
db.restaurans.find({
    'address.zipCode' : { $lte : 10025 },
    cuisine : 'Spanish'
}).sort({ name : 1 })
```

8.

    - `db.restaurans.createIndex({ 'address.borough' : 1, name : 1 })`
    - `db.restaurans.createIndex({ 'address.borough' : 1, cuisine : 1, 'address.zipCode' : 1 })`
    - `db.restaurans.createIndex({ cuisine : 1, 'grades.year' : 1, 'grades.grade' : 1, name : -1 })`
    - `db.restaurans.createIndex({ cuisine : 1, name : 1, 'address.zipCode' : 1 })`

9.

- `db.restaurans.createIndex({ name : 'text', cuisine : 'text', 'address.borough' : 'text' })`

```
db.restaurans.find({
    $text : { $search : 'French' }
})
```

```
db.restaurans.find({
    $text : { $search : 'Mexican turner Bronx' }
})
```

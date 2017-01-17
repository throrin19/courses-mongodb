faker.locale = "en"

const STEPCOUNT = 100; //total 10000 * 100 = 1000000

function isRandomBlank(blankWeight) {
    return Math.random() * 100 <= blankWeight;
};

function randomizer(max) {
  return Math.round(Math.random() * max);
}

const CATEGORIES = [
    'Vulgarisation',
    'Placement produit',
    'Tuto rapide',
    'Mode',
    'Déco'
];

const WEBSITES = [
    'JV.com',
    'Developpez.com',
    'Mode&Co',
    'Deco&Co'
];

for (let i = 0; i < 200; i++) {
    db.getCollection("rawData").insertMany(
        _.times(STEPCOUNT, () => {
            let doc = {
                "firstname": faker.name.firstName(),
                "lastname": faker.name.lastName(),
                "login": faker.internet.userName(),
                "password": faker.internet.password(),
                "lastConnectionDate": faker.date.past(),
                "website" : WEBSITES[randomizer(WEBSITES.length - 1)],
                "articles": []
            };

            let nbArticles = Math.floor(Math.random() * 50);

            for (let j = 0; j < nbArticles; ++j) {
                doc.articles.push({
                    "title": faker.lorem.words(),
                    "content": faker.lorem.paragraphs(),
                    "date": faker.date.past(),
                    "note": Math.floor(Math.random() * 5),
                    "category" : CATEGORIES[randomizer(CATEGORIES.length - 1)]
                });
            }


            return doc;
        })
    )

    console.log(`${(i + 1) * STEPCOUNT} docs inserted`);
}

faker.locale = "fr";

const STEPCOUNT = 100;

function isRandomBlank(blankWeight) {
    return Math.random() * 100 <= blankWeight;
};

function randomizer(max) {
  return Math.round(Math.random() * max);
};

const USERS     = [];
const DEVICES   = [ 'android', 'iphone', 'desktop', 'windowsphone' ];
const TYPES     = [ 'TIME', 'READ', 'CLICK_CAT' ];

for (let a = 0; a < 90; a++) {
    USERS.push(faker.internet.userName());
}

const WEBSITES = {
    'Les Echos' : {
        'Économies' : Array.from(new Array(70), (x,i) => faker.lorem.words()),
        'Politique' : Array.from(new Array(100), (x,i) => faker.lorem.words()),
        'Brêves AFP' : Array.from(new Array(150), (x,i) => faker.lorem.words()),
        'Sport' : Array.from(new Array(90), (x,i) => faker.lorem.words())
    },
    'Marianne' : {
        'Économies' : Array.from(new Array(50), (x,i) => faker.lorem.words()),
        'Politique' : Array.from(new Array(20), (x,i) => faker.lorem.words()),
        'Brêves AFP' : Array.from(new Array(10), (x,i) => faker.lorem.words()),
        'Horoscope' : Array.from(new Array(180), (x,i) => faker.lorem.words()),
    },
    'Le Figaro' : {
        'Économies' : Array.from(new Array(10), (x,i) => faker.lorem.words()),
        'Politique' : Array.from(new Array(230), (x,i) => faker.lorem.words()),
        'Brêves AFP' : Array.from(new Array(30), (x,i) => faker.lorem.words()),
        'Sport' : Array.from(new Array(120), (x,i) => faker.lorem.words())
    },
    'Le Monde' : {
        'Économies' : Array.from(new Array(130), (x,i) => faker.lorem.words()),
        'Politique' : Array.from(new Array(100), (x,i) => faker.lorem.words()),
        'Brêves AFP' : Array.from(new Array(20), (x,i) => faker.lorem.words()),
        'Horoscope' : Array.from(new Array(120), (x,i) => faker.lorem.words()),
        'Sport' : Array.from(new Array(90), (x,i) => faker.lorem.words())
    },
    'Mediapart' : {
        'Économies' : Array.from(new Array(1), (x,i) => faker.lorem.words()),
        'Politique' : Array.from(new Array(200), (x,i) => faker.lorem.words())
    },
    'Le cannard enchaîné' : {
        'Économies' : Array.from(new Array(90), (x,i) => faker.lorem.words()),
        'Politique' : Array.from(new Array(123), (x,i) => faker.lorem.words()),
    }
};

for (let i = 0; i < 200; i++) {
    db.getCollection("stats").insertMany(
        _.times(STEPCOUNT, () => {
            let doc = {
                "username" : USERS[randomizer(USERS.length -1)],
                "type" : TYPES[randomizer(TYPES.length -1)],
                "date": faker.date.past(),
                "device" : DEVICES[randomizer(DEVICES.length -1)],
                "website" : Object.keys(WEBSITES)[randomizer(Object.keys(WEBSITES).length -1)]
            }

            let categories = Object.keys(WEBSITES[doc.website]);

            if (doc.type == 'TIME') {
                doc.time = Math.floor(Math.random() * 230000);
            }

            if (doc.type == 'CLICK_CAT') {
                doc.category = categories[randomizer(categories.length -1)];
            }

            if (doc.type == 'READ') {
                var hasCategory = Math.floor(Math.random() * 2);

                doc.category = categories[randomizer(categories.length -1)];

                var articles = WEBSITES[doc.website][doc.category];

                doc.article = articles[randomizer(articles.length -1)];
            }

            return doc;
        });
    )

    console.log(`${(i + 1) * STEPCOUNT} docs inserted`);
}

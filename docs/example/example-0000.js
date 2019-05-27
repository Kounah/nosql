// this first example will delete / create collections and create/modify/delete
// documents within WITHOUT using models and schemes

let con = require('./connect');

(async () => {
  // get all collections
  try {
    await con.startSession();
    let collections = await con.db.collections();

    let result = await Promise.all(collections.map(collection => new Promise(async resolve => {
      let count = await collection.countDocuments({});

      if(['user'].includes(collection.collectionName)) {
        await collection.drop();
        resolve(`${collection.collectionName}: ${count} documents -- dropped`);
      } else {
        resolve(`${collection.collectionName}: ${count} documents`);
      }
    })));

    result.forEach(item => {
      console.log(item);
    });

    let userCollection = await con.db.createCollection('user');

    process.exit(1);
  } catch(err) {
    console.error(err);
  }
})();

const {MongoClient, CommandStartedEvent} = require('mongodb');

async function main() {
  const uri =
    'mongodb://root:pass12345@35.227.186.249/admin?retryWrites=true&w=majority';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    /*
    await createMultipleProducts(client, [
      {
        product_name: 'Dell X2',
        product_description: 'Business laptop - wouldnt buy it',
        quantity: 3,
      },
      {
        product_name: 'Sony bio',
        product_description: 'Business laptop - would not gift it to anyone',
        quantity: 5,
      },
      {
        product_name: 'Acer whatever',
        product_description: 'Business laptop - Makes a great paper weight',
        quantity: 100,
      },
    ]);


    await upsertProductByName(client, 'Bad laptop', {
      product_name: 'BAd laptop',
      product_description: 'Cheap and nast',
      quantity: 5,
    });
*/

    //await findOneProduct(client, "Sony bio");
    //await updateProductByName(client, 'Sony bio', {quantity: 50});
    //await findProductsMinQuantity(client, {minStock: 25});
    //await updatedAllProductWithType(client);
    //await deleteProductByName(client, 'BAd laptop');
    await deleteProductAddedBeforeDate(client, new Date('2020-02-15'));
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function deleteProductAddedBeforeDate(client, date) {
  const result = await client
    .db('product')
    .collection('products')
    .deleteMany({date_added: {$lt: date}});

  console.log(`${result.deletedCount} document(s) was/were deleted`);
}

async function deleteProductByName(client, nameOfProduct) {
  const result = await client
    .db('pbtech')
    .collection('products')
    .deleteOne({product_name: nameOfProduct});

  console.log(`${result.deletedCount} document(s) was/were deleted`);
}

async function updatedAllProductWithType(client) {
  const result = await client
    .db('pbtech')
    .collection('products')
    .updateMany(
      {product_type: {$exists: false}},
      {$set: {product_type: 'Unknown'}}
    );

  console.log(
    `${result.matchedCount} document(s) that matched the query criteria`
  );
  console.log(`${result.modifiedCount} document(s) was/were updated`);
}

async function upsertProductByName(client, nameOfProduct, update) {
  const result = await client
    .db('pbtech')
    .collection('products')
    .updateOne({product_name: nameOfProduct}, {$set: update}, {upsert: true});

  console.log(`${result.matchedCount} document(s) matched the query criteria`);

  if (result.upsertedCount > 0) {
    console.log(`One document was upserted with the id ${result.upsertedId}`);
  } else {
    console.log(`${result.modifiedCount} documents was/were updated`);
  }
}

async function updateProductByName(client, nameOfProduct, update) {
  const result = await client
    .db('pbtech')
    .collection('products')
    .updateOne({product_name: nameOfProduct}, {$set: update});

  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(`${result.modifiedCount} documents was/were updated`);
}

async function findProductsMinQuantity(
  client,
  {minStock = 0, maxNumberOfResults = Number.MAX_SAFE_INTEGER} = {}
) {
  const cursor = client
    .db('pbtech')
    .collection('products')
    .find({
      quantity: {$gte: minStock},
    })
    .sort({product_name: -1})
    .limit(maxNumberOfResults);
  const results = await cursor.toArray();

  results.forEach((result, i) => {
    console.log();
    console.log(`${i + 1}. product:${result.product_name}`);
    console.log(`    _id: ${result._id}`);
    console.log(`    quantity: ${result.quantity}`);
  });
}

async function findOneProduct(client, nameOfProduct) {
  const result = await client
    .db('pbtech')
    .collection('products')
    .findOne({product_name: nameOfProduct});

  if (result) {
    console.log(
      `Found a product in the collection with the name '${nameOfProduct}'`
    );
    console.log(result);
  } else {
    console.log(`No product found of the name '${nameOfProduct}'`);
  }
}

async function createMultipleProducts(client, newProducts) {
  const result = await client
    .db('pbtech')
    .collection('products')
    .insertMany(newProducts);
  console.log(result.insertedIds);
}

async function createProduct(client, newProduct) {
  const result = await client
    .db('pbtech')
    .collection('products')
    .insertOne(newProduct);
  console.log(
    `New product created with the following id: ${result.insertedId}`
  );
}

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();
  console.log('Databases:');
  databasesList.databases.forEach(db => {
    console.log(`- ${db.name}`);
  });
}

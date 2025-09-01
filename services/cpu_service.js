const { MongoDB } = require("./mongo_service");

const COLLECTION_NAME = 'cpus_collection';

async function getItems() {
    const mongo = new MongoDB();
    const items =  await mongo.getItems(COLLECTION_NAME, {});
    mongo.close();
    return items;
}

async function getItem(id) {
    const mongo = new MongoDB();
    const item =  await mongo.findItem(COLLECTION_NAME, { id: id });
    mongo.close();
    return item;
}

async function putItem(item) {
    const mongo = new MongoDB();
    const result =  await mongo.putItem(COLLECTION_NAME, item);
    mongo.close();
    return result;
}

module.exports = {getItems, putItem, getItem};

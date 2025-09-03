const { MongoDB } = require("./mongo_service");
const {ObjectId} = require("mongodb");

const COLLECTION_NAME = 'cpus_collection';

async function getItems() {
    const mongo = new MongoDB();
    const items =  await mongo.getItems(COLLECTION_NAME, {});
    mongo.close();
    return items;
}

async function getItem(id) {
    const mongo = new MongoDB();
    const item =  await mongo.findItem(COLLECTION_NAME, { _id: new ObjectId(id) });
    mongo.close();
    return item;
}

async function setItem(id, item) {
    const mongo = new MongoDB();
    const query = { _id: new ObjectId(id) };
    delete item["_id"];
    const result =  await mongo.setItem(COLLECTION_NAME, query, item);
    mongo.close();
    return result;
}

async function deleteItem(id) {
    const mongo = new MongoDB();
    const result =  await mongo.deleteItem(COLLECTION_NAME, { _id: new ObjectId(id) });
    mongo.close();
    return result;
}

async function putItem(item) {
    const mongo = new MongoDB();
    const result =  await mongo.putItem(COLLECTION_NAME, item);
    mongo.close();
    return result;
}

module.exports = {getItems, putItem, getItem, setItem, deleteItem};

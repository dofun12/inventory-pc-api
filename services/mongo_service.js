const { MongoClient } = require("mongodb");
require("dotenv").config();
class MongoDB{

    constructor(){
        this.#getConnection();
    }

    MONGO_URI = process.env.MONGO_URI;

    #getConnection() {
        // Replace the uri string with your connection string
        const uri = this.MONGO_URI;
        this.client = new MongoClient(uri);
        this.db = this.client.db('computerdb');
    }

    #getDB() {
        return this.db;
    }

    async setItem(collectionName, query, update) {
        this.#getConnection();
        const collection = this.#getDB().collection(collectionName);
        const result = await collection.updateOne(query, { $set: update }, { upsert: false });
        console.log(result);
        this.close();
    }

    async deleteItem(collectionName, query) {
        this.#getConnection();
        const collection = this.#getDB().collection(collectionName);
        const result = await collection.deleteOne(query);
        console.log(result);
        this.close();
    }

    async putItem(collectionName, item) {
        this.#getConnection();
        const collection = this.#getDB().collection(collectionName);
        const result = await collection.insertOne(item);
        console.log(result);
        this.close();
    }

    async findItem(collectionName, query) {
        this.#getConnection();
        const collection = this.#getDB().collection(collectionName);
        const item = await collection.findOne(query);
        this.close();
        return item;
    }

    async getItems(collectionName, query = {}) {
        this.#getConnection();
        const collection = this.#getDB().collection(collectionName);
        const items = await collection.find(query).toArray();
        this.close();
        return items;
    }

    close(){
        this.client.close();
    }

}

module.exports = {MongoDB};

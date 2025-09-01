const { MongoClient } = require("mongodb");

class MongoDB{

    constructor(){
        this.#getConnection();
    }

    #getConnection() {
        // Replace the uri string with your connection string
        const uri = "mongodb://root:root@192.168.15.101:27018/";
        this.client = new MongoClient(uri);
        this.db = this.client.db('computerdb');
    }

    #getDB() {
        return this.db;
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

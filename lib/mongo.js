const { MongoClient, ObjectId } = require("mongodb");
const { config } = require('../config');
const debug = require('debug')("app:mongo");

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName ;

//const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/?authSource=${DB_NAME}`
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@cluster0-lasv7.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this.dbName = DB_NAME;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect(err => {
                if (err) {
                    reject(err);
                }

                debug("Connected succesfully to mongo.");
                resolve(this.client.db(this.dbName));
            })
        });
    }


    async index(collection, query) {
        const db = await this.connect();
        return db.collection(collection)
            .find(query)
            .toArray();
    }

    async show(collection, id) {
        const db = await this.connect();
        return db.collection(collection)
            .findOne({ '_id': ObjectId(id) });
    }

    async create(collection, data) {
        const db = await this.connect();
        const result = await db.collection(collection)
            .insertOne(data);
        return result.insertedId;
    }

    async update(collection, id, data){
        const db = await this.connect();
        const result = await db.collection(collection)
            .updateOne({ '_id': ObjectId(id) }, { $set: data }, { upsert: true });
        return result.modifiedCount;
    }

    async delete(collection, id){
        const db = await this.connect();
        const result = await db.collection(collection)
            .deleteOne({ '_id': ObjectId(id) });
        return result.deletedCount;
    }
}

module.exports = MongoLib;
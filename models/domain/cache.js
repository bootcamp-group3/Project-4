const cache = require("../../config/config-redis");
const uuidv4 = require("uuid/v4");
const Promise = require("bluebird");

// Class to handle the cache and integration with redis
// Generic offering - can store any JSON object here
module.exports = class Cache {
    constructor(obj) {
        this.id = uuidv4();
        this.item = obj;
    }

    // Create a new object in the cache
    static async createObj(obj) {
        const stringObj = JSON.stringify(obj.item);

        await Promise.all([
            cache.setAsync(obj.id, stringObj),
            cache.expire(obj.id, 3600)]);

        return Promise.resolve(obj.id);
    }

    // Delete an object in the cache
    static async deleteObj(id) {
        const status = await cache.delAsync(id);

        return Promise.resolve(status);
    }

    // Update an object in the cache
    static async updateObj(id, newObj) {
        const stringObj = JSON.stringify(newObj);
        const status = await cache.setAsync(id, stringObj);

        return Promise.resolve(status);
    }

    // Retrieve an object in the cache
    static async retrieveObj(id) {
        const obj = await cache.getAsync(id);

        return Promise.resolve(JSON.parse(obj));
    }

    toString() {
        return "game : [id:" + this.id + ", board:" + this.item + "]";
    }
};

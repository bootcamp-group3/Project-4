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
        let status;

        try {
            await Promise.all([
                cache.setAsync(obj.id, stringObj),
                cache.expire(obj.id, 3600)]);

            if (status === null) {
                throw null;
            } else {
                status = obj.id;
            }
        } catch (error) {
            console.log(error);
            status = error;
        } finally {
            return Promise.resolve(status);
        }
    }

    // Delete an object in the cache
    static async deleteObj(id) {
        let status;

        try {
            status = await cache.delAsync(id);

            if (status === null) {
                throw null;
            }
        } catch (error) {
            console.log(error);
            status = error;
        } finally {
            return Promise.resolve(status);
        }
    }

    // Update an object in the cache
    static async updateObj(id, newObj) {
        let status;

        try {
            const stringObj = JSON.stringify(newObj);
            status = await cache.setAsync(id, stringObj);

            if (status === null) {
                throw null;
            }
        } catch (error) {
            console.log(error);
            status = error;
        } finally {
            return Promise.resolve(status);
        }
    }

    // Retrieve an object in the cache
    static async retrieveObj(id) {
        let status;

        try {
            status = await cache.getAsync(id);

            if (status === null) {
                throw null;
            } else {
                status = JSON.parse(status);
            }
        } catch (error) {
            console.log(error);
            status = error;
        } finally {
            return Promise.resolve(status);
        }
    }

    toString() {
        return "game : [id:" + this.id + ", board:" + this.item + "]";
    }
};

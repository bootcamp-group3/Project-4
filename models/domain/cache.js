const cache = require("../../config/config-redis");
const uuidv4 = require("uuid/v4");
const Promise = require("bluebird");

module.exports = class Cache {
    constructor(obj) {
        this.id = uuidv4();
        this.item = obj;
    }

    static async createObj(obj) {
        await Promise.all([
            cache.hmsetAsync(obj.id, obj.item),
            cache.expire(obj.id, 3600)]);

        return Promise.resolve(obj.id);
    }

    static async deleteObj(id) {
        const status = await cache.delAsync(id);

        return Promise.resolve(status);
    }

    static async updateObj(id, newObj) {
        const status = await cache.hmsetAsync(id, newObj);

        return Promise.resolve(status);
    }

    static async retrieveObj(id) {
        const status = await cache.hgetallAsync(id);

        return Promise.resolve(status);
    }

    toString() {
        return "game : [id:" + this.id + ", board:" + this.item + "]";
    }
};

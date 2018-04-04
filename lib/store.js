const shortid = require('shortid');

module.exports = class Store {
    constructor() {
        this.list = [];
    }

    save(object) {
        object._id = shortid.generate();
        this.list.push(object);
        return object;
    }

    get(id) {
        const mappedList = new Map(this.list.map(storedObject => [storedObject._id, storedObject]));
        return mappedList.get(id) || null;
    }

    getAll() {
        return this.list.slice();
    }

    

};
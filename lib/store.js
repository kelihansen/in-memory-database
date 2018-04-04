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

    remove(id) {
        const mappedList = new Map(this.list.map(storedObject => [storedObject._id, storedObject]));
        const removed = mappedList.delete(id);
        return removed ? { removed: true } : { removed: false };
    }

//     .remove(<id>)
// removes the object from the store that has that id
// return { removed: true } if the object was removed, else return { removed: false } if the object did not exist

};
const assert = require('assert');
const Store = require('../lib/store');

describe('Store', () => {
    let storeInstance;
    beforeEach(() => {
        storeInstance = new Store();
    });

    it('exists and has a property "list" that is an empty array', () => {
        assert.deepEqual(storeInstance.list, []);
    });

    it('has a save method that adds a new id to an object and returns that object', () => {
        const newlyIdentified = storeInstance.save({});
        const idCheck = newlyIdentified._id ? true : false;
        assert.equal(idCheck, true);
    });
});
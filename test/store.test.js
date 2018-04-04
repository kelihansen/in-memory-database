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

    it('has a save method that also adds the object to its storage list', () => {
        const newlySaved = storeInstance.save({});
        const storedCheck = storeInstance.list[0];
        assert.equal(storedCheck, newlySaved);
    });
});
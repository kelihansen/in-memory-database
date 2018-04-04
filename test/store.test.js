const assert = require('assert');
const Store = require('../lib/store');
const shortid = require('shortid');

describe('Store', () => {
    let storeInstance;
    beforeEach(() => {
        storeInstance = new Store();
    });

    const testObject1 = { bird: 'cardinal', color: 'red' };
    const testObject2 = { bird: 'goldfinch', color: 'yellow' };
    const testObject3 = { bird: 'raven', color: 'black' };

    function loadList(one, two, three) {
        storeInstance.save(one);
        storeInstance.save(two);
        storeInstance.save(three);
    } 

    it('exists and has a property "list" that is an empty array', () => {
        assert.deepEqual(storeInstance.list, []);
    });

    it('has a save method that adds a new id to an object and returns that object', () => {
        const newlyIdentified = storeInstance.save(testObject1);
        const idCheck = shortid.isValid(newlyIdentified._id);
        assert.equal(idCheck, true);
    });

    it('has a save method that also adds the object to its storage list', () => {
        const newlySaved = storeInstance.save(testObject1);
        const storedCheck = storeInstance.list[0];
        assert.equal(storedCheck, newlySaved);
    });

    it('has a get method that returns null if the id does not exist', () => {
        const gotten = storeInstance.get('fake id');
        const nullTest = gotten === null ? true : false;
        assert.equal(nullTest, true);
    });

    it('has a get method that returns the object with a certain id', () => {
        loadList(testObject1, testObject2, testObject3);
        const chosenObject = storeInstance.list[1];
        const chosenId = storeInstance.list[1]._id;
        const gotten = storeInstance.get(chosenId);
        assert.equal(chosenObject, gotten);
    });

    it('has a getAll method that returns an array of all stored object', () => {
        loadList(testObject1, testObject2, testObject3);
        const allObjects = storeInstance.getAll();
        assert.deepEqual(storeInstance.list, allObjects);        
    });
});
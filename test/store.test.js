const assert = require('assert');
const Store = require('../lib/store');
const shortid = require('shortid');

describe('Store', () => {
    let storeInstance;
    beforeEach(() => {
        storeInstance = new Store();
    });

    const testObjectArray = [
        { bird: 'cardinal', color: 'red' },
        { bird: 'goldfinch', color: 'yellow' },
        { bird: 'raven', color: 'black' }
    ];

    function loadList(array) {
        array.forEach(object => storeInstance.save(object));
    } 

    it('exists and has a property "list" that is an empty array', () => {
        assert.deepEqual(storeInstance.list, []);
    });

    it('has a save method that returns the saved object with a shortid added', () => {
        const newlyIdentified = storeInstance.save(testObjectArray[0]);
        const idCheck = shortid.isValid(newlyIdentified._id);
        assert.equal(idCheck, true);
    });

    it('has a save method that also adds the object to its storage list', () => {
        const newlySaved = storeInstance.save(testObjectArray[0]);
        const storedCheck = storeInstance.list[0];
        assert.equal(storedCheck, newlySaved);
    });

    it('has a get method that returns null if the id does not exist', () => {
        const gotten = storeInstance.get('fake id');
        const nullTest = gotten === null ? true : false;
        assert.equal(nullTest, true);
    });

    it('has a get method that returns the object with a certain id', () => {
        loadList(testObjectArray);
        const chosenObject = storeInstance.list[1];
        const chosenId = storeInstance.list[1]._id;
        const gotten = storeInstance.get(chosenId);
        assert.equal(chosenObject, gotten);
    });

    it('has a getAll method that returns an array of all stored objects', () => {
        loadList(testObjectArray);        
        const allObjects = storeInstance.getAll();
        assert.deepEqual(storeInstance.list, allObjects);        
    });

    it('has a getAll method that returns an empty array when there are no objects', () => {
        const allObjects = storeInstance.getAll();
        assert.deepEqual(allObjects, []);
    });

    it('has a getAll method that does not return the underlying array', () => {
        loadList(testObjectArray);        
        const allObjects = storeInstance.getAll();
        const equivalencyTest = storeInstance.list === allObjects;
        assert.equal(equivalencyTest, false);
    });

    it('has a remove method that returns { removed: false } if id passed in does not exist', () => {
        const removedReport = storeInstance.remove('fake id');
        assert.deepEqual(removedReport, { removed: false });
    });

    it('has a remove method that removes the object with a certain id and returns { removed: true }, leaving other objects unchanged', () => {
        loadList(testObjectArray);        
        const chosenObject = storeInstance.list[1];
        const otherObject = storeInstance.list[0];
        const chosenId = storeInstance.list[1]._id;
        const removedReport = storeInstance.remove(chosenId);
        const inclusionTest = storeInstance.list.includes(chosenObject);
        const otherObjectsUnchangedTest = storeInstance.list.includes(otherObject);
        assert.equal(inclusionTest, false);
        assert.deepEqual(removedReport, { removed: true });
        assert.equal(otherObjectsUnchangedTest, true);
    });
});
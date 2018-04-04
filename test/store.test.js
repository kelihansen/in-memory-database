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
});